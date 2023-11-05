import { Router as RouterExpress } from "express";


class Router{
    constructor(controller){
        if(!controller) throw Error("Parametro 'controller' não foi informado.");

        
        this.controller = controller;
        this.router = RouterExpress();
    

        this.router.get("/", (req, res, next) => {
          try {
        
        
            this.controller.readAll()
            .then((result) => res.json(result))
            .catch((error) => next(error));
            
          
          } catch (error) {
            next(error);
          }
      });
  
  
      this.router.get("/:id", (req, res, next) => {
          try {
            const id = req.params.id;
            
            
            this.controller.readOne(id)
            .then((result) => {  
              
              
              if(result) res.json(result);
              else res.status(404).json({message: "Registro não encontrado."});
            
            
            })
            .catch((error) => next(error));
         
        
          } catch (error) {
            next(error);
          }
        });
        
        
        this.router.post("/", (req, res, next) => {
          try {
            const register = req.body;
            
            
            this.controller.create(register)
            .then((result) => {
              
              
              if(!result.insertedId) res.status(404).json({message: "Registro não foi cadastrado."});
              else res.status(201).json(register);
            
            
            })
            .catch((error) => next(error));
         
        
          } catch (error) {
            next(error);
          }
      });
        
        
      this.router.put("/:id", (req, res, next) => {
          try {
            const _id = req.params.id;
            const register = req.body;
            
            
            this.controller.updateOne(_id, register)
            .then((result) => {
              
              
              if(result.modifiedCount === 0) res.status(404).json({message: "Registro não foi encontrado."});
              else res.status(201).json(register);
            
            
            })
            .catch((error) => next(error));
         
        
          } catch (error) {
            next(error);
          }
      });
        
        
      this.router.delete("/:id", (req, res, next) => {
          try {
            const id = req.params.id;
            
            
            this.controller.deleteOne(id)
            .then((result) => {
              
              
              if(result.deletedCount === 0) res.status(404).json({message: "Registro não encontrado."});
              else res.json({message: "Registro deletado."});
            
            
            })
            .catch((error) => next(error));
         
        
          } catch (error) {
            next(error);
          }
      });
    }
}


export { Router };
