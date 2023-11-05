import cors from "cors";
import { json } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions, morganOptions, variables } from "../conf"
import { logger } from "../utils";
import { swaggerFile, swaggerUi } from "../doc";

// Faz o trantamento de erro da aplicação
const erroMiddleware = (app) => {
  if (!app) throw Error("Parametro 'app' não foi informado.");
  

  app.use((error, req, res, next) =>{
    logger.error(error.message);
    res.status(500).json({ error: error.message });
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
  if (variables.MODE === "development") {
    app.use(morgan(morganOptions));
  }

};

const setMiddlewareFinal = (app) => {
  if (!app) {
    throw new Error("Parametro app não foi informado.");
  }


  // Middleware para tratamento de erros
  erroMiddleware(app);
  
  
  // Middleware para geração de documentação
  app.use(['/', 'doc'], swaggerUi.serve, swaggerUi.setup(swaggerFile));

};


export { erroMiddleware , setMiddlewareStart, setMiddlewareFinal };
