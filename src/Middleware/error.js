export const erroMiddleware = (app) => {
  if (!app) throw Error("Parametro 'app' não foi informado.");
    
  
  app.use((error, req, res, next) =>{
    Logger.error(error.message);
    res.status(500).json({ error: error.message });
  });
};
  