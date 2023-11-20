import { ROLES } from "../conf";
import { verifyToken } from "../utils/jwt";


export const hasPermission =(ACCEPTED_ROLES) => {
  if (!ACCEPTED_ROLES) throw Error("Parametro 'ACCEPTED_ROLES' não foi informado.");


  return (req, res, next) =>{
    if(typeof ACCEPTED_ROLES === "string" ) ACCEPTED_ROLES = [ACCEPTED_ROLES];
  
    const authorization = req.header('Authorization');
    
    
    
    if(authorization) {
      
      const token = authorization.split(" ")[1];
      const data = verifyToken(token);
      const USER_ROLES = data.roles || [ROLES.COMMOM]; 
      let result = false;

      
      console.log("ACCEPTED_ROLES: ", ACCEPTED_ROLES);
      console.log("USER_ROLES: ", USER_ROLES);


      ACCEPTED_ROLES.forEach(role => {
        if(USER_ROLES.includes(role)) result = true;
      })


      result ? next() : res.status(403).json({ message: "Não é possivel acessar esse recurso." });

    }
    else res.status(401).json({ message: "Bearer Token não informado." });
    
    
  };
}

