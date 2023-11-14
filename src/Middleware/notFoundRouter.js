export const NotFouldRouter = (app) => {
    app.all('*', (req, res, next) =>{
        res.json({ message: "Rota não mepeada." })
    });
}
  