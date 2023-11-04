import cors from "cors";
import { json } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions, morganOptions, variables } from "../conf";


// Faz o trantamento de erro da aplicação
const erroMiddleware = (app) => {
  if (!app) throw Error("Parametro 'app' não foi informado.");
  
  app.use((error, req, res, next) =>{
    res.status(500).json({ error: error.message })
  });
}


const setMiddleware = (app) => {
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

export { erroMiddleware , setMiddleware };
