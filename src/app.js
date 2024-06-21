import express from "express";
import process from "process";
import { AppDatabase } from "./config/dbConnect.js";
import routes from "./routes/index.js";

const { DB_USER_NAME, DB_USER_PASSWORD, DB_CLUSTER_NAME, DB_NAME } =
    process.env;

const db = new AppDatabase(
    DB_USER_NAME,
    DB_USER_PASSWORD,
    DB_NAME,
    DB_CLUSTER_NAME,
);

const dbConnection = await db.createDatabase();

dbConnection.on("error", (error) => {
    console.error(`Erro com a conexão da base de dados: ${error}`);
});

dbConnection.once("open", () => {
    console.log("Conexão realizada com sucesso com a base de dados!");
});

const app = express();

routes(app);

export default app;
