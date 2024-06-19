import book from "../models/BookModel.js";

class BookController {
  static async getBooks(req, res) {
    try {
      const bookList = await book.find();

      res.status(200).json(bookList);
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
      const { params, body } = req;
      const { id } = params;
      const { newBookTitle } = body;

      const searchedItem = await book.findByIdAndUpdate(id, {
        title: newBookTitle,
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

      if (!body)
        res
          .status(400)
          .send("É necessário adicionar um livro no body da requisição");

      const { title } = body;

      if (typeof title !== "string" || !title) {
        res
          .status(400)
          .send("É necessário adicionar um livro com um nome válido");
        return;
      }

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
      });

      newBook.save({ validateBeforeSave: true });

      res.status(201).json({
        message: "Livro adicionado com sucesso!",
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
