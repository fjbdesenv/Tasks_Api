import { swaggerFile, swaggerUi } from "../doc";

export const swagger = (app) => {
  if (!app) throw Error("Parametro 'app' não foi informado.");

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
};
    