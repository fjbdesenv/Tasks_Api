import cors from "cors";
import { json } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions, morganOptions, variables } from "../conf"
import { erroMiddleware } from "./error";
import { NotFouldRouter } from "./notFoundRouter";
import { swagger } from "./swagger";


const setMiddlewareStart = (app) => {
  if (!app) {
    throw new Error("Parametro app não foi informado.");
  }

  
  // Middleware para configuração de cors
  app.use(cors(corsOptions));


  // Middleware para leitura de JSONs
  app.use(json());

  
  // Middleware para configuração de Headers de segunrança
  app.use(helmet());

  
  // Middleware para configuração de logs, apenas em desenvolvimento
  if (variables.MODE === "development") {
    app.use(morgan(morganOptions));
  }

};

const setMiddlewareFinal = (app) => {
  if (!app) {
    throw new Error("Parametro app não foi informado.");
  }

  
  // Middleware para geração de documentação
  swagger(app);


  // Middleware para tratamento de erros
  erroMiddleware(app);


  // Middleware para rotas não mapeada
  NotFouldRouter(app);

};


export { erroMiddleware , setMiddlewareStart, setMiddlewareFinal };
