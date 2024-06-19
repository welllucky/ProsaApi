import express from "express";
import BookRoutes from "./BookRouter.js";


const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("WellluckY Server Started!"));

  app.use(express.json(), BookRoutes);
};

export default routes