import express from "express";

import { RouterUsuario } from "./Routes";
import { erroMiddleware, setMiddleware } from "./middleware";
import { variables } from "./conf";

const app = express();

// Adicionando os Middleware
setMiddleware(app);


// Adicionando as rotas
app.use('/usuarios', RouterUsuario);

// Adicionando Middleware de tratamento de erro
erroMiddleware(app);


// Iniciando servidor
app.listen(variables.PORT, () => {
  console.log(`Servidor esta rodando: http://localhost:${variables.PORT}`);
});
