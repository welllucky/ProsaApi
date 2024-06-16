import express from "express";

const app = express();

app.use(express.json());

const books = [
  {
    id: 1,
    title: "Harry Potter e a Câmara Secreta",
  },
  {
    id: 2,
    title: "Harry Potter e as Relíquias da Morte",
  },
];

const getBook = (id) => {
  const passedId = Number(id);

  const searchedItem = books.find((item) => item.id === passedId);
  const searchedItemId = books.findIndex((item) => item.id === passedId);

  return {
    searchedItem,
    searchedItemId,
  };
};

app.get("/", (req, res) => {
  res.status(200).send("WellluckY Server Started!");
});

app.get("/livros", (req, res) => {
  const { query } = req;
  const { id } = query;

  if (id) {
    const { searchedItem } = getBook(id);

    if (!searchedItem) {
      res.status(404).send("Livro não encontrado");
      return;
    }

    res.status(200).send(searchedItem);
  } else {
    res.status(200).json(books);
  }
});

app.get("/livros/:id", (req, res) => {
  const { params } = req;
  const { id } = params;

  const { searchedItem } = getBook(id);

  if (!searchedItem) {
    res.status(404).send("Livro não encontrado");
    return;
  }

  res.status(200).send(searchedItem);
});

app.put("/livros/:id", (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { newBookTitle } = body;
  const { searchedItem, searchedItemId } = getBook(id);

  console.log({ searchedItem });

  if (!searchedItem) {
    res.status(404).send("O livro mencionado não existe");
    return;
  }

  books[`${searchedItemId}`].title = newBookTitle;
  res.status(201).send(searchedItem);
});

app.post("/livros", (req, res) => {
  const { body } = req;
  console.log(body);

  if (!body)
    res
      .status(400)
      .send("É necessário adicionar um livro no body da requisição");

  const { id, title } = body;

  if (typeof id !== "number" || id <= 0) {
    res
      .status(400)
      .send("É necessário adicionar um livro com um id númerico e maior que 0");
    return;
  }

  if (typeof title !== "string" || !title) {
    res.status(400).send("É necessário adicionar um livro com um nome válido");
    return;
  }

  const { searchedItem } = getBook(id);

  if (searchedItem) {
    res.status(400).send("O livro já existe na base de dados");
    return;
  }

  books.push({
    id,
    title,
  });

  res.status(201).send(books);
});

app.delete("/livros/:id", (req, res) => {
  const { params } = req;
  const { id } = params;
  const { searchedItemId, searchedItem } = getBook(id);

  if (!searchedItem) {
    res.status(404).send("O livro mencionado não existe");
    return;
  }

  books.splice(searchedItemId, 1);
  res.status(200).send("Livro deletado");
});

export default app;
