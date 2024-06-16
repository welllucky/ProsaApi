import app from "./src/app.js";

const port = process.env.APPLICATION_PORT;
const dbUser = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_USER_PASSWORD;
const appName = process.env.DB_CLUSTER_NAME;

const db = createDatabase(dbUser, dbPassword, appName);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
