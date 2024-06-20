import { author } from "../models/AuthorModel.js";

class AuthorController {
  static async getAuthors(req, res) {
    let responseContent;
    try {
      const { query } = req;
      const { name } = query;

      if (name) {
        responseContent = await author.findOne({ name: name });
      } else {
        responseContent = await author.find();
      }

      if (!responseContent) {
        res.status(204);
        return;
      }

      res.status(200).json(responseContent);
    } catch (error) {
      res.status(500).send({
        message: `Não foi possivel encontrar os autores - ${error.message}`,
      });
    }
  }

  static async getAuthor(req, res) {
    try {
      const { params } = req;
      const { id } = params;

      const searchedItem = await author.findById(id);

      if (!searchedItem) {
        res.status(404).send({
          message: "Autor não encontrado",
        });
        return;
      }

      res.status(200).send({
        message: "Autor encontrado com sucesso!",
        value: searchedItem,
      });
    } catch (error) {
      res.status(500).send({
        message: `Não foi possivel encontrar o Autor - ${error.message}`,
      });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const { params, body } = req;
      const { id } = params;

      const searchedItem = await author.findByIdAndUpdate(id, body);

      if (!searchedItem) {
        res.status(404).json({
          message: "O Autor mencionado não existe",
        });
        return;
      }

      res.status(201).json({
        message: "Autor atualizado com sucesso!",
        value: searchedItem,
      });
    } catch (error) {
      res.status(500).json({
        message: `Não foi possivel atualizar o Autor - ${error}`,
      });
    }
  }

  static async addAuthor(req, res) {
    try {
      const { body } = req;

      if (!body)
        res
          .status(400)
          .send("É necessário adicionar um Autor no body da requisição");

      const { name } = body;

      if (typeof name !== "string" || !name) {
        res
          .status(400)
          .send("É necessário adicionar um Autor com um nome válido");
        return;
      }

      const AuthorIsInDB = await author.findOne({
        name: body.name,
      });

      if (AuthorIsInDB) {
        res.status(400).json({
          messageError: "O Autor já existe na base de dados",
          data: AuthorIsInDB,
        });
        return;
      }

      const newAuthor = new author({
        ...body,
      });

      newAuthor.save({ validateBeforeSave: true });

      res.status(201).json({
        message: "Autor adicionado com sucesso!",
        value: newAuthor,
      });
    } catch (error) {
      res.status(500).json({
        message: `Não foi possível adicionar o Autor - ${error.message}`,
      });
    }
  }

  static async removeAuthor(req, res) {
    try {
      const { params } = req;
      const { id } = params;

      const searchedItem = await author.findByIdAndDelete(id);

      if (!searchedItem) {
        res.status(404).json({
          message: "O Autor mencionado não existe",
        });
        return;
      }

      res.status(200).json({
        message: "O Autor foi deletado com sucesso",
        value: searchedItem,
      });
    } catch (error) {
      res.status(500).json({
        message: `Não foi possivel deletar o Autor - ${error.message}`,
      });
    }
  }
}
export default AuthorController;
