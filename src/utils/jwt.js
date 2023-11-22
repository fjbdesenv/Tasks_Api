import { sign, verify } from "jsonwebtoken";
import { variables } from "../conf";


const { SECRET_KEY } = variables.JWT;


const generateToken = (data) =>{
    if(!data) throw Error("Parametro 'data' não foi informado.");

    return sign(data, SECRET_KEY); 
};

const verifyToken = (token) => {
    if(!token) throw Error("Parametro 'token' não foi informado.");
    
    return verify(token, SECRET_KEY);
}

export { generateToken, verifyToken };