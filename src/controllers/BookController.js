import { author, book } from "../models/index.js";
import {
    BadRequest,
    NotFoundError,
    code,
    getFilterObject,
} from "../utils/index.js";
import { authorValidator, bookValidator } from "../validators/index.js";

class BookController {
    static async getBooks(req, res, next) {
        let responseContent = {};
        try {
            const { query } = req,
                { title } = query;

            if (title) {
                bookValidator.shape.title.parse(title);
                responseContent = await book.findOne({ title });
            } else {
                responseContent = await book.find();
            }

            if (!responseContent) {
                new NotFoundError().send(res);
                return;
            }

            res.status(code.responseSuccessfully).json(responseContent);
        } catch (error) {
            next(error);
        }
    }

    static async getBook(req, res, next) {
        try {
            const { params } = req,
                { id } = params,
                searchedItem = await book.findById(id);

            if (!searchedItem) {
                new NotFoundError("Livro não encontrado").send(res);
                return;
            }

            res.status(code.responseSuccessfully).send({
                message: "Livro encontrado com sucesso!",
                value: searchedItem,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateBook(req, res, next) {
        try {
            let newBookAuthor = {};
            const { params, body } = req,
                { id } = params,
                { authorId, title } = body;

            const booksInDB = await book.exists({
                title,
            });

            if (!authorValidator.shape.id.safeParse(authorId).success) {
                newBookAuthor = await author.findById(authorId);
                if (newBookAuthor) {
                    new NotFoundError("O Autor mencionado não existe").send(
                        res,
                    );
                    return;
                }
            }

            if (booksInDB) {
                res.status(code.notAcceptable).json({
                    message:
                        "O título mencionado já existe e não pode ser duplicado.",
                    data: {
                        // eslint-disable-next-line no-underscore-dangle
                        id: booksInDB._id,
                    },
                });
                return;
            }

            const searchedItem = await book.findByIdAndUpdate(id, {
                ...body,
                author: { ...newBookAuthor },
            });

            if (!searchedItem) {
                new NotFoundError("O livro mencionado não existe").send(res);
                return;
            }

            res.status(code.resourceCreated).json({
                message: "Livro atualizado com sucesso!",
                value: searchedItem,
            });
        } catch (error) {
            next(error);
        }
    }

    static async addBook(req, res, next) {
        try {
            const { body } = req;

            if (!body)
                res.status(code.badRequest).send(
                    "É necessário adicionar um livro no body da requisição",
                );

            bookValidator.parse(body);

            const bookAuthor = await author.findById(body.authorId);
            const bookIsInDB = await book.findOne({
                title: body.title,
            });

            if (bookIsInDB) {
                res.status(code.badRequest).json({
                    data: bookIsInDB,
                    messageError: "O livro já existe na base de dados",
                });
                return;
            }

            const newBook = new book({
                ...body,
                author: { ...bookAuthor },
            });

            await newBook.save({ validateBeforeSave: true });

            res.status(
                bookAuthor ? code.resourceCreated : code.partialContent,
            ).json({
                message:
                    bookAuthor ?
                        "Livro adicionado com sucesso!"
                    :   "O autor citado não existe, entretando o livro foi salvo com sucesso!",
                value: newBook,
            });
        } catch (error) {
            next(error);
        }
    }

    static async removeBook(req, res, next) {
        try {
            const { params } = req,
                { id } = params,
                searchedItem = await book.findByIdAndDelete(id);

            if (!searchedItem) {
                res.status(code.notFound).json({
                    message: "O livro mencionado não existe",
                });
                return;
            }

            res.status(code.noContent).json({
                message: "O livro foi deletado com sucesso",
                value: searchedItem,
            });
        } catch (error) {
            next(error);
        }
    }

    static async search(req, res, next) {
        try {
            const { query } = req;

            if (!Object.keys(query).length) {
                new BadRequest("Nenhum seletor utilizado na consulta.").send(
                    res,
                );
                return;
            }

            const terms = getFilterObject("book", bookValidator, query);

            const searchedContent = await book.find(terms);

            if (!searchedContent.length) {
                new NotFoundError("Sem resultados para a consulta atual!").send(
                    res,
                );
                return;
            }

            res.status(code.responseSuccessfully).json({
                message: "Livro(s) encontrados com sucesso!",
                data: searchedContent,
            });
        } catch (error) {
            next(error);
        }
    }
}
export default BookController;
