import express from "express";
import AuthorController from "../controllers/AuthorController.js";

const AuthorRoutes = express.Router();

AuthorRoutes.get("/autores", AuthorController.getAuthors)
    .get("/autores/:id", AuthorController.getAuthor)
    .put("/autores/:id", AuthorController.updateAuthor)
    .post("/autores", AuthorController.addAuthor)
    .delete("/autores/:id", AuthorController.removeAuthor);

export default AuthorRoutes;
