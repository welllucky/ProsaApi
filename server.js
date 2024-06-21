import app from "./src/app.js";
import process from "process";

const port = process.env.APPLICATION_PORT;

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
