import cors from "cors";
import { json } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions, morganOptions, VARIABLES } from "../conf"
import { Logger } from "../utils";
import { swaggerFile, swaggerUi } from "../doc";


const erroMiddleware = (app) => {
  if (!app) throw Error("Parametro 'app' não foi informado.");
  

  app.use((error, req, res, next) =>{
    Logger.error(error.message);
    res.status(500).json({ error: error.message });
  });
}


const NotFouldRouter = (app) => {
  app.all('*', (req, res, next) =>{
    res.json({ message: "Rota não mepeada." })
  });
}


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
  if (VARIABLES.MODE === "development") {
    app.use(morgan(morganOptions));
  }

};

const setMiddlewareFinal = (app) => {
  if (!app) {
    throw new Error("Parametro app não foi informado.");
  }

  
  // Middleware para geração de documentação
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));


  // Middleware para tratamento de erros
  erroMiddleware(app);


  // Middleware para rotas não mapeada
  NotFouldRouter(app);

};


export { erroMiddleware , setMiddlewareStart, setMiddlewareFinal };
