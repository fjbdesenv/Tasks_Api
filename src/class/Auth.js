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
      let user_data = null;

      
      if(result){

        // Consulta registros com a mesma senha criptografada
        const result2 = result.filter((register) => descriptografar(register.senha) === data.senha); 
         
        if(result2.length === 1){
          const register = result2[0];
          user_data = { _id: register._id, roles: register.roles };
          const token = generateToken(user_data);

          user_data = { token, id:user_data._id, roles: user_data.roles };
        }       

      }; 
      

      await desconectar(con);

      return user_data;

    } catch (error) {
      throw error;    
    }
  }
}

export { Auth };