import { createServer } from "http";

const port = 3000;

const rotas = {
  "/": "WellluckY Server!",
  "/livros": "Rota dos livros",
  "/autores": "Olha o autores",
};

const server = createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "accept-language": ["Portuguese", "English"],
  });
  console.log(`URL: ${req.url}`);
  res.end(rotas[req.url]);
});

server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
