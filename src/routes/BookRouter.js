import express from "express";
import BookController from "../controllers/BookController.js";

const BookRoutes = express.Router();

BookRoutes.get("/livros", BookController.getBooks)
    .get("/livros/:id", BookController.getBook)
    .put("/livros/:id", BookController.updateBook)
    .post("/livros", BookController.addBook)
    .delete("/livros/:id", BookController.removeBook);

export default BookRoutes;
