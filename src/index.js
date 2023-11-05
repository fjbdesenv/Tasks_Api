import express from "express";

import * as Routers from "./Routes";
import { setMiddlewareStart, setMiddlewareFinal } from "./middleware";
import { variables } from "./conf";


const app = express();


// Adicionando Middleware iniciais
setMiddlewareStart(app);


// Adicionando as rotas
app.use('/usuarios', Routers.RouterUsuario);
app.use('/tarefas', Routers.RouterTarefa);


// Adicionando Middleware apos rotas
setMiddlewareFinal(app);


// Iniciando servidor
app.listen(variables.PORT, () => {
  console.log(`Servidor esta rodando: http://localhost:${variables.PORT}`);
});
