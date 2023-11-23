import { autoIncremente, conectar, desconectar } from "../DataBase";
import { collections, variables } from "../Conf";
import { DateBR } from "../utils";


const collection = collections.USUARIOS;
const { NAME } = variables.DATA_BASE;


const Controller = {

  async readOne(id) {
    try {
      
      const con = await conectar();
      const result = await con.db(NAME).collection(collection).findOne({_id: id});
      await desconectar(con);


      return result;

    } catch (error) {
      throw error;    
    }
  },


  async readAll() {
    try {

      const con = await conectar();
      const result = await con.db(NAME).collection(collection).find({}).toArray();
      await desconectar(con);
      

      return result;
      
    } catch (error) {
      throw error; 
    }
  },


  async create(register) {
    try {
      
      const con = await conectar();
      register.data_criacao = DateBR();       // Adicionado data
      register.data_atualizacao = DateBR();   // Adicionado data
      register._id = await autoIncremente(con, collection);  //Consultando o próximo código
      
      const result = await con.db(NAME).collection(collection).insertOne(register);
      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  },


  async updateOne(_id, register) {
    try {
      
      register.data_atualizacao = DateBR(); // Adicionado data

      
      const con = await conectar();
      let result = await con.db(NAME).collection(collection).findOneAndUpdate({ _id }, {$set: {...register, _id} });
      await desconectar(con);

      return result;
      
    } catch (error) {
      throw error;    
    }
  },


  async deleteOne(id) {
    try {
      
      const con = await conectar();
      const result = await con.db(NAME).collection(collection).deleteOne({_id: id});
      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  }
}

export { Controller as ControllerTarefa };