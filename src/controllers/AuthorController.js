import { author } from "../models/AuthorModel.js";
import { BadRequest } from "../utils/errors/BadRequest.js";
import { ResourceNotFound } from "../utils/errors/ResourceNotFound.js";
import { code } from "../utils/statusCode.js";
import { authorValidator } from "../validators/authorValidator.js";

class AuthorController {
    static async getAuthors(req, res, next) {
        let responseContent = {};
        try {
            const { query } = req;
            const name = new RegExp(query.name, "ui");

            if (name) {
                responseContent = await author.findOne({ name });
            } else {
                responseContent = await author.find();
            }

            if (!responseContent) {
                new ResourceNotFound().send(res);
                return;
            }

            res.status(code.responseSuccessfully).json(responseContent);
        } catch (error) {
            next(error);
        }
    }

    static async getAuthor(req, res, next) {
        try {
            const { params } = req;
            const { id } = params;

            const searchedItem = await author.findById(id);

            if (!searchedItem) {
                res.status(code.notFound).send({
                    message: "Autor não encontrado",
                });
                return;
            }

            res.status(code.responseSuccessfully).send({
                message: "Autor encontrado com sucesso!",
                data: searchedItem,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateAuthor(req, res, next) {
        try {
            const { params, body } = req;
            const { id } = params;

            const searchedItem = await author.findByIdAndUpdate(id, body);

            authorValidator.parse(body);

            if (!searchedItem) {
                res.status(code.notFound).json({
                    message: "O Autor mencionado não existe",
                });
                return;
            }

            res.status(code.resourceCreated).json({
                message: "Autor atualizado com sucesso!",
                data: searchedItem,
            });
        } catch (error) {
            next(error);
        }
    }

    static async addAuthor(req, res, next) {
        try {
            const { body } = req;

            authorValidator.parse(body);

            const AuthorIsInDB = await author.findOne({
                name: body.name,
            });

            if (AuthorIsInDB) {
                new BadRequest("O Autor já existe na base de dados").send(res);
                return;
            }

            const newAuthor = new author({
                ...body,
            });

            await newAuthor.save({ validateBeforeSave: true });

            res.status(code.resourceCreated).json({
                message: "Autor adicionado com sucesso!",
                data: newAuthor,
            });
        } catch (error) {
            next(error);
        }
    }

    static async removeAuthor(req, res, next) {
        try {
            const { params } = req;
            const { id } = params;

            const searchedItem = await author.findByIdAndDelete(id);

            if (!searchedItem) {
                res.status(code.notFound).json({
                    message: "O Autor mencionado não existe",
                });
                return;
            }

            res.status(code.responseSuccessfully).json({
                message: "O Autor foi deletado com sucesso",
                data: searchedItem,
            });
        } catch (error) {
            next(error);
        }
    }
}
export default AuthorController;
