import AuthorController from "../controllers/AuthorController.js";
import express from "express";

const AuthorRoutes = express.Router();

AuthorRoutes.get("/autores", AuthorController.getAuthors);

AuthorRoutes.get("/autores/:id", AuthorController.getAuthor);

AuthorRoutes.put("/autores/:id", AuthorController.updateAuthor);

AuthorRoutes.post("/autores", AuthorController.addAuthor);

AuthorRoutes.delete("/autores/:id", AuthorController.removeAuthor);

export default AuthorRoutes;
