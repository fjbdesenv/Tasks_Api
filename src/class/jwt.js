import { sign, verify } from "jsonwebtoken";
import { variables } from "../Conf";

class Jsonwebtoken {
    constructor(){

    }

    
    generateToken = (data) =>{
        try {
            return sign(data, variables.JWT_SECRET_KEY);
        } catch (error) {
            throw new Error(error.message);    
        }
    }

    verifyToken = (token) =>{
        try {
            return verify(token, variables.JWT_SECRET_KEY);
        } catch (error) {
            throw new Error(error.message);    
        }
    }
}

export { Jsonwebtoken };