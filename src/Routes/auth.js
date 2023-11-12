import { Router } from "express";
import { InstanceAuth } from "../Auth";

const RouterAuth = Router();

RouterAuth.post("/",  (req, res, next) => {
    InstanceAuth.auth(req.body).then((token) => {

        if(token) res.status(200).json({ token });
        else res.status(401).json({ message: "Não foi possivel fazer a autenticação"});
    
    }).catch((error) => next(error.message));
});

export { RouterAuth };
