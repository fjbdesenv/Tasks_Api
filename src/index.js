import express from "express";

import * as Routers from "./Routes";
import { setMiddlewareStart, setMiddlewareFinal } from "./middleware";
import { variables } from "./conf";
import { Logger } from "./utils/winston";


const { PORT } = variables.SERVER;
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
app.listen(PORT, () => {
  const message = `Servidor esta rodando em http://localhost:${PORT}`;
  Logger.info(message);
});
