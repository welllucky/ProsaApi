import app from "./src/app.js";

const port = process.env.APPLICATION_PORT;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
