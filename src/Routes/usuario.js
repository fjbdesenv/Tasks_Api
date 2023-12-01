import { Router as RouterExpress } from "express";
import { hasPermission } from  "../Middleware/hasPermission";
import { ControllerUsuario } from "../Controllers";
import { ResponseMessages } from "../utils";
import { mapPathRoles } from "../conf";


const router = RouterExpress();
const controller = ControllerUsuario;
const mapRoles = mapPathRoles.USUARIOS;



router.get("/", hasPermission(mapRoles.GET_ALL), (req, res, next) => {
    try {


        controller.user.readAll()
            .then((result) => res.json(result))
            .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});


router.get("/:id", hasPermission(mapRoles.GET_ID), (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        
        controller.user.readOne(id)
        .then((result) => {  
            
            
            if(result) res.json(result);
            else ResponseMessages.NotFound(res);
        
        
        })
        .catch((error) => next(error));
    

    } catch (error) {
        next(error);
    }
});
    
    
router.post("/", hasPermission(mapRoles.POST), (req, res, next) => {
    try {
        const body = req.body;
        
        
        controller.user.create(body)
        .then((result) => {
            
            
            if(!result._id) ResponseMessages.NotCreate(res);
            else res.status(201).json(result);
        
        
        })
        .catch((error) => next(error));
    

    } catch (error) {
        next(error);
    }
});
    
    
router.put("/:id", hasPermission(mapRoles.PUT), (req, res, next) => {
    try {
        const _id = parseInt(req.params.id);
        const body = req.body;
        
        
        controller.user.updateOne(_id, body)
        .then((result) => {
        
        
            if(!result) ResponseMessages.NotFound(res);
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
        
        
        controller.user.deleteOne(id)
        .then((result) => {
        
        
            if(result.deletedCount === 0) ResponseMessages.NotFound(res);
            else ResponseMessages.Deleted(res);
        
        
        })
        .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});


// Rotas de tarefas

router.get("/:idUser/tarefas", hasPermission(mapRoles.GET_ALL_TASK), (req, res, next) => {
    try {
        const idUser = parseInt(req.params.idUser);


        controller.task.readAll(idUser)
            .then((result) => res.json(result))
            .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});

router.get("/:idUser/tarefas/:idTask", hasPermission(mapRoles.GET_ID_TASK), (req, res, next) => {
    try {
        const idUser = parseInt(req.params.idUser);
        const idTask = parseInt(req.params.idTask);
        

        controller.task.readOne(idUser, idTask)
        .then((result) => {  
            
            
            if(result) res.json(result);
            else ResponseMessages.NotFound(res);
        
        
        })
        .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});


router.post("/:idUser/tarefas", hasPermission(mapRoles.POST_TASK), (req, res, next) => {
    try {
        const body = req.body;
        body.id_user = parseInt(req.params.idUser);
        
        
        controller.task.create(body)
        .then((result) => {
            
            
            if(!result._id) ResponseMessages.NotFound(res);
            else res.status(201).json(result);
        
        
        })
        .catch((error) => next(error));
    

    } catch (error) {
        next(error);
    }
});
    
    
router.put("/:idUser/tarefas/:idTask", hasPermission(mapRoles.PUT), (req, res, next) => {
    try {

        const body = req.body;
        body._id = parseInt(req.params.idTask);
        body.id_user = parseInt(req.params.idUser);
        
        
        controller.task.updateOne(body)
        .then((result) => {
        
        
            if(!result) ResponseMessages.NotFound(res);
            else res.status(200).json(result);
        
        
        })
        .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});


router.delete("/:idUser/tarefas/:idTask", hasPermission(mapRoles.DELETE_ID_TASK), (req, res, next) => {
    try {
        const idUser = parseInt(req.params.idUser);
        const idTask = parseInt(req.params.idTask);
        

        controller.task.deleteOne(idUser, idTask)
        .then((result) => {
        
        
            if(result.deletedCount === 0) ResponseMessages.NotFound(res);
            else res.json({message: "Registro deletado."});
        
        
        })
        .catch((error) => next(error));
    
    
    } catch (error) {
        next(error);
    }
});
    

export { router as RouterUsuario };
