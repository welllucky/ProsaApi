import express from "express";
import BookController from "../controllers/BookController.js";

const BookRoutes = express.Router();

BookRoutes.get("/livros", BookController.getBooks);

BookRoutes.get("/livros/:id", BookController.getBook);

BookRoutes.put("/livros/:id", BookController.updateBook);

BookRoutes.post("/livros", BookController.addBook);

BookRoutes.delete("/livros/:id", BookController.removeBook);

export default BookRoutes;