import { sign, verify } from "jsonwebtoken";
import { variables } from "../Conf";


const { SECRET_KEY } = variables.JWT;


class Jsonwebtoken {
    constructor(){

    }

    
    generateToken = (data) =>{
        try {
            return sign(data, SECRET_KEY);
        } catch (error) {
            throw new Error(error.message);    
        }
    }

    verifyToken = (token) =>{
        try {
            return verify(token, SECRET_KEY);
        } catch (error) {
            throw new Error(error.message);    
        }
    }
}

export { Jsonwebtoken };