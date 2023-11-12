import express from "express";

import * as Routers from "./Routes";
import { setMiddlewareStart, setMiddlewareFinal } from "./middleware";
import { VARIABLES } from "./conf";
import { Logger } from "./utils/winston";


const app = express();


// Adicionando Middleware iniciais
setMiddlewareStart(app);


// Adicionando as rotas
app.use('/auth', Routers.RouterAuth);
app.use('/usuarios', Routers.RouterUsuario);
app.use('/tarefas', Routers.RouterTarefa);


// Adicionando Middleware apos rotas
setMiddlewareFinal(app);


// Iniciando servidor
app.listen(VARIABLES.PORT, () => {
  const message = `Servidor esta rodando em http://localhost:${VARIABLES.PORT}`;
  Logger.info(message);
});
