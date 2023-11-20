import { sign, verify } from "jsonwebtoken";
import { variables } from "../conf";


const generateToken = (data) =>{
    if(!data) throw Error("Parametro 'data' não foi informado.");

    return sign(data, variables.JWT_SECRET_KEY); 
};

const verifyToken = (token) => {
    if(!token) throw Error("Parametro 'token' não foi informado.");
    
    return verify(token, variables.JWT_SECRET_KEY);
}

export { generateToken, verifyToken };