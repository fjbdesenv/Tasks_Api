import { Router } from "express";
import { InstanceAuth } from "../Auth";

const RouterAuth = Router();

RouterAuth.post("/",  (req, res, next) => {
    InstanceAuth.auth(req.body).then((user_data) => {

        if(user_data) res.status(200).json(user_data);
        else res.status(401).json({ message: "Não foi possivel fazer a autenticação."});
    
    }).catch((error) => next(error.message));
});

export { RouterAuth };
