import { author } from "../models/AuthorModel.js";
import { book } from "../models/BookModel.js";

class BookController {
  static async getBooks(req, res) {
    let responseContent;
    try {
      const { query } = req;
      const { title } = query;

      if (title) {
        responseContent = await book.findOne({ title: title });
      } else {
        responseContent = await book.find();
      }

      if (!responseContent) {
        res.status(204);
        return;
      }

      res.status(200).json(responseContent);
    } catch (error) {
      res.status(500).send({
        message: `Não foi possivel encontrar os livros - ${error.message}`,
      });
    }
  }

  static async getBook(req, res) {
    try {
      const { params } = req;
      const { id } = params;

      const searchedItem = await book.findById(id);

      if (!searchedItem) {
        res.status(404).send({
          message: "Livro não encontrado",
        });
        return;
      }

      res.status(200).send({
        message: "Livro encontrado com sucesso!",
        value: searchedItem,
      });
    } catch (error) {
      res.status(500).send({
        message: `Não foi possivel encontrar o livro - ${error.message}`,
      });
    }
  }

  static async updateBook(req, res) {
    try {
      let newBookAuthor;
      const { params, body } = req;
      const { id } = params;
      const { authorId, title } = body;

      const booksInDB = await book.findOne({
        title: title,
      });

      if (authorId) {
        newBookAuthor = await author.findById(authorId);
      }

      if (booksInDB) {
        res.status(400).json({
          message: "O livro mencionado não existe e não pode ser duplicado",
        });
        return;
      }

      if (!newBookAuthor) {
        res.status(400).json({
          message: "O Autor mencionado não existe",
        });
        return;
      }

      const searchedItem = await book.findByIdAndUpdate(id, {
        ...body,
        author: { ...newBookAuthor },
      });

      if (!searchedItem) {
        res.status(404).json({
          message: "O livro mencionado não existe",
        });
        return;
      }

      res.status(201).json({
        message: "Livro atualizado com sucesso!",
        value: searchedItem,
      });
    } catch (error) {
      res.status(500).json({
        message: `Não foi possivel atualizar o livro - ${error}`,
      });
    }
  }

  static async addBook(req, res) {
    try {
      const { body } = req;
      const { title, authorId } = body;

      if (!body)
        res
          .status(400)
          .send("É necessário adicionar um livro no body da requisição");

      if (typeof title !== "string" || !title) {
        res
          .status(400)
          .send("É necessário adicionar um livro com um nome válido");
        return;
      }

      if (authorId && typeof authorId !== "string") {
        res
          .status(400)
          .send("É necessário adicionar um id válido que referêncie um autor");
        return;
      }

      const bookAuthor = await author.findById(authorId);
      const bookIsInDB = await book.findOne({
        title: body.title,
      });

      if (bookIsInDB) {
        res.status(400).json({
          messageError: "O livro já existe na base de dados",
          data: bookIsInDB,
        });
        return;
      }

      const newBook = new book({
        ...body,
        author: { ...bookAuthor },
      });

      newBook.save({ validateBeforeSave: true });

      res.status(bookAuthor ? 201 : 206).json({
        message: bookAuthor
          ? "Livro adicionado com sucesso!"
          : "O autor citado não existe, entretando o livro foi salvo com sucesso!",
        value: newBook,
      });
    } catch (error) {
      res.status(500).json({
        message: `Não foi possível adicionar o livro - ${error.message}`,
      });
    }
  }

  static async removeBook(req, res) {
    try {
      const { params } = req;
      const { id } = params;

      const searchedItem = await book.findByIdAndDelete(id);

      if (!searchedItem) {
        res.status(404).json({
          message: "O livro mencionado não existe",
        });
        return;
      }

      res.status(200).json({
        message: "O livro foi deletado com sucesso",
        value: searchedItem,
      });
    } catch (error) {
      res.status(500).json({
        message: `Não foi possivel deletar o livro - ${error.message}`,
      });
    }
  }
}
export default BookController;
