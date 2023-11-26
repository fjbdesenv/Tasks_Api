export const NotFouldRouter = (app) => {
    if (!app) throw Error("Parametro 'app' não foi informado.");

    app.all('*', (req, res, next) =>{
        res.json({ message: "Rota não mepeada." })
    });
}
  