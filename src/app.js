import express from "express";
import morgan from "morgan";
import { AppDatabase } from "./config/dbConnect.js";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/index.js";
import routes from "./routes/index.js";

const { DB_USER_NAME, DB_USER_PASSWORD, DB_CLUSTER_NAME, DB_NAME, NODE_ENV } =
    process.env;

const db = new AppDatabase(
    DB_USER_NAME,
    DB_USER_PASSWORD,
    DB_NAME,
    DB_CLUSTER_NAME,
);

const dbConnection = await db.createDatabase();

dbConnection.on("error", (error) => {
    // eslint-disable-next-line no-console
    console.error(`Erro com a conexão da base de dados: ${error}`);
});

dbConnection.once("open", () => {
    // eslint-disable-next-line no-console
    console.log("Conexão realizada com sucesso com a base de dados!");
});

const app = express();

app.use(
    express.json(),
    morgan("development" === NODE_ENV ? "dev" : "combined"),
);

routes(app);

app.use(notFoundMiddleware, errorMiddleware);

export default app;
