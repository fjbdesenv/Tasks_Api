import { autoIncremente, conectar, desconectar } from "../DataBase";
import { collections, variables } from "../Conf";
import { DateBR, criptografar } from "../utils";


const collection = collections.USUARIOS;
const { NAME } = variables.DATA_BASE;


const Controller = {

  async readOne(_id) {
    try {
      
      const con = await conectar();
      const result = await con.db(NAME).collection(collection).findOne({ _id });
      
      
      // Remover senha
      if(result) result.senha = null;
      
      
      await desconectar(con);


      return result;

    } catch (error) {
      throw error;    
    }
  },


  async readAll() {
    try {

      const con = await conectar();
      const aux = await con.db(NAME).collection(collection).find({}).toArray();
      await desconectar(con);
      

      // Remover senha 
      const result = aux.map((register)=>{ 
        register.senha = null;
        return register;
      });

      
      return result;
      
    } catch (error) {
      throw error; 
    }
  },


  async create(register) {
    try {
      
      const con = await conectar();
      register.data_criacao = DateBR();   // Adicionado data
      register.data_atualizacao = DateBR();  // Adicionado data
      register._id = await autoIncremente(con, collection);  // Consultando o próximo código
      if(register.senha) register.senha = criptografar(register.senha); // Criptografia de senhas
      
      
      await con.db(NAME).collection(collection).insertOne(register);
      const result = await con.db(NAME).collection(collection).findOne({ _id: register._id });
      await desconectar(con);


      // Remover senha 
      if(result) result.senha = null;


      return result;
      
    } catch (error) {
      throw error;    
    }
  },


  async updateOne(_id, register) {
    try {
      
      register.data_atualizacao = DateBR(); // Adicionado data
      if(register.senha) register.senha = criptografar(register.senha); // Criptografia de senhas
      
      
      const con = await conectar();
      
      
      await con.db(NAME).collection(collection).updateOne({ _id }, {$set: {...register, _id} });
      const result = await con.db(NAME).collection(collection).findOne({ _id });
      if(result) { result.senha = null; } // Remover senha


      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  },


  async deleteOne(_id) {
    try {
      
      const con = await conectar();
      const result = await con.db(NAME).collection(collection).deleteOne({ _id });
      
      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  }
}

export { Controller as ControllerUsuario };