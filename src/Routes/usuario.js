import { Router as RouterExpress } from "express";
import { hasPermission } from  "../Middleware/hasPermission";
import { ControllerUsuario } from "../Controllers";
import { mapPathRoles } from "../conf";


const router = RouterExpress();
const controller = ControllerUsuario;
const mapRoles = mapPathRoles.USUARIOS;



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
    const register = req.body;
    
    
    controller.create(register)
    .then((result) => {
        
        
        if(!result.insertedId) res.status(404).json({message: "Registro não foi cadastrado."});
        else res.status(201).json(register);
    
    
    })
    .catch((error) => next(error));
    

    } catch (error) {
    next(error);
    }
});
    
    
router.put("/:id", hasPermission(mapRoles.PUT), (req, res, next) => {
    try {
        const _id = parseInt(req.params.id);
        const register = req.body;
        
        
        controller.updateOne(_id, register)
        .then((result) => {
        
        
        if(result.modifiedCount === 0) res.status(404).json({message: "Registro não foi encontrado."});
        else res.status(201).json(register);
        
        
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


export { router as RouterUsuario };
