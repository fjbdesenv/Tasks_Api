import { conectar, desconectar } from "../DataBase";
import { variables } from "../conf";
import { descriptografar, generateToken } from "../utils";

const { NAME } = variables.DATA_BASE;

class Auth {

  constructor(collection){
    if(!collection) throw Error("Parametro 'collection' não foi informado.");
    
    this.collection = collection;
}

async auth(data) {
    if(!data) throw Error("Parametro 'data' não foi informado.");
    
    try {
      const con = await conectar();
      const where = { email: data.email };
      const result = await con.db(NAME).collection(this.collection).find(where).toArray();
      let token = null;

      
      if(result){

        // Consulta registros do a mesma senha criptografada
        const aux = result.filter((register) => descriptografar(register.senha) === data.senha);  
        if(aux.length === 1){
          const register = aux[0];
          token = generateToken({ _id: register._id, roles: register.roles })
        }       

      }; 
      

      await desconectar(con);

      return token;

    } catch (error) {
      throw error;    
    }
  }
}

export { Auth };