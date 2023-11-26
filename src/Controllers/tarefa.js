import { autoIncremente, conectar, desconectar } from "../DataBase";
import { collections, variables } from "../Conf";
import { DateBR } from "../utils";


const collection = collections.TAREFAS;
const { NAME } = variables.DATA_BASE;


const Controller = {

  async readOne(_id) {
    try {
      
      const con = await conectar();
      const result = await con.db(NAME).collection(collection).findOne({ _id });
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
      
      await con.db(NAME).collection(collection).insertOne(register);
      const result = await con.db(NAME).collection(collection).findOne({ _id: register._id });
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
      
      
      await con.db(NAME).collection(collection).findOneAndUpdate({ _id }, {$set: {...register, _id} });
      const result = await con.db(NAME).collection(collection).findOne({ _id });
      

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

export { Controller as ControllerTarefa };