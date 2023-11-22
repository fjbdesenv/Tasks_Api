import { conectar, desconectar } from "../DataBase";
import { variables } from "../conf";
import { generateToken } from "../utils";

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
      const where = { senha: data.senha, email: data.email }; 
      const result = await con.db(NAME).collection(this.collection).findOne(where);
      
      let token = null;
      if(result) token = generateToken({ _id: result._id, roles: result.roles }); 
      
      await desconectar(con);

      return token;

    } catch (error) {
      throw error;    
    }
  }
}

export { Auth };