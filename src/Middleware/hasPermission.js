import { roles } from "../conf";
import { verifyToken } from "../utils/jwt";


export const hasPermission = (acceptedRoles) => {
  if (!acceptedRoles) throw Error("Parametro 'acceptedRoles' não foi informado.");


  return (req, res, next) =>{
    if(typeof acceptedRoles === "string" ) acceptedRoles = [acceptedRoles];
  
    
    const authorization = req.header('Authorization');
    
    // Se for aceito a role '' não é necessario autorização
    if(acceptedRoles.includes('')) next();
    

    else if (authorization) {
      
      
      const token = authorization.split(" ")[1];
      const data = verifyToken(token);
      const userRoles = data.roles || [roles.COMMOM]; 
      let result = false;


      acceptedRoles.forEach(role => {
        if(userRoles.includes(role)) result = true;
      })


      result ? next() : res.status(403).json({ message: "Não é possivel acessar esse recurso." });

    }
    
    
    else res.status(401).json({ message: "Bearer Token não informado." });
    
    
  };
}

