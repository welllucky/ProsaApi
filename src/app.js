import express from "express";
import { AppDatabase } from "./config/dbConnect.js";
import { book } from "./models/Book.js";

const { DB_USER_NAME, DB_USER_PASSWORD, DB_CLUSTER_NAME, DB_NAME } =
  process.env;

const app = express();

app.use(express.json());

const db = new AppDatabase(
  DB_USER_NAME,
  DB_USER_PASSWORD,
  DB_NAME,
  DB_CLUSTER_NAME
);

const dbConnection = await db.createDatabase();

dbConnection.on("error", (error) => {
  console.error(`Erro com a conexão da base de dados: ${error}`);
});

dbConnection.once("open", () => {
  console.log("Conexão realizada com sucesso com a base de dados!");
});

app.get("/", (req, res) => {
  res.status(200).send("WellluckY Server Started!");
});

app.get("/livros", async (req, res) => {
  const bookList = await book.find();
  console.log({
    bookList,
  });
  res.status(200).json(bookList);
});

app.get("/livros/:id", async (req, res) => {
  const { params } = req;
  const { id } = params;

  const searchedItem = await book.findById(id);

  if (!searchedItem) {
    res.status(404).send("Livro não encontrado");
    return;
  }

  res.status(200).send(searchedItem);
});

app.put("/livros/:id", async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { newBookTitle } = body;

  const searchedItem = await book.findByIdAndUpdate(id, {
    title: newBookTitle,
  });

  console.log({ searchedItem });

  if (!searchedItem) {
    res.status(404).send("O livro mencionado não existe");
    return;
  }

  res.status(201).send(searchedItem);
});

app.post("/livros", async (req, res) => {
  const { body } = req;
  console.log(body);

  if (!body)
    res
      .status(400)
      .send("É necessário adicionar um livro no body da requisição");

  const { title } = body;

  // if (typeof id !== "number" || id <= 0) {
  //   res
  //     .status(400)
  //     .send("É necessário adicionar um livro com um id númerico e maior que 0");
  //   return;
  // }

  if (typeof title !== "string" || !title) {
    res.status(400).send("É necessário adicionar um livro com um nome válido");
    return;
  }

  const bookIsInDB = await book.findOne({
    title: body.title,
  });
  console.log({
    bookIsInDB,
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

  res.status(201).json(newBook);
});

app.delete("/livros/:id", async (req, res) => {
  const { params } = req;
  const { id } = params;

  const searchedItem = await book.findByIdAndDelete(id);

  if (!searchedItem) {
    res.status(404).send("O livro mencionado não existe");
    return;
  }

  res.status(200).send("Livro deletado");
});

export default app;
