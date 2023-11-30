import { Router as RouterExpress } from "express";
import { hasPermission } from  "../Middleware/hasPermission";
import { ControllerTarefa } from "../Controllers";
import { mapPathRoles } from "../conf";


const router = RouterExpress();
const controller = ControllerTarefa;
const mapRoles = mapPathRoles.TAREFAS;


router.get("/", hasPermission(mapRoles.GET_ALL), (req, res, next) => {
    try {


        controller.readAll()
            .then((result) => res.json(result))
            .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});


router.get("/:id", hasPermission(mapRoles.GET_ID), (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        
        controller.readOne(id)
        .then((result) => {  
            
            
            if(result) res.json(result);
            else res.status(404).json({message: "Registro não encontrado."});
        
        
        })
        .catch((error) => next(error));
    

    } catch (error) {
        next(error);
    }
});
    
    
router.post("/", hasPermission(mapRoles.POST), (req, res, next) => {
    try {
        const body = req.body;
        
        
        controller.create(body)
        .then((result) => {
            
            
            if(!result._id) res.status(404).json({message: "Registro não foi cadastrado."});
            else res.status(201).json(result);
        
        
        })
        .catch((error) => next(error));
    

    } catch (error) {
        next(error);
    }
});
    
    
router.put("/:id", hasPermission(mapRoles.PUT), (req, res, next) => {
    try {
        
        const body = req.body;
        body._id = parseInt(req.params.id);
        
        
        controller.updateOne(body)
        .then((result) => {
        
        
            if(!result) res.status(404).json({message: "Registro não foi encontrado."});
            else res.status(200).json(result);
        
        
        })
        .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});
    
    
router.delete("/:id", hasPermission(mapRoles.DELETE_ID), (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        
        controller.deleteOne(id)
        .then((result) => {
        
        
            if(result.deletedCount === 0) res.status(404).json({message: "Registro não encontrado."});
            else res.json({message: "Registro deletado."});
        
        
        })
        .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});


export { router as RouterTarefa };
