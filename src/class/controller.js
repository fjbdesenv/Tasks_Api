import { autoIncremente, conectar, desconectar } from "../DataBase";
import { dataBase } from "../conf";
import { DateBR } from "../utils";

class Controller {

    constructor(collection){
      if(!collection) throw Error("Parametro 'collection' não foi informado.");

      this.collection = collection;
    }

  async readOne(id) {
    try {
      

      const con = await conectar();
      const result = await con.db(dataBase.DATA_BASE_NAME).collection(this.collection).findOne({_id: id});
      await desconectar(con);


      return result;

    } catch (error) {
      throw error;    
    }
  }


  async readAll() {
    try {


      const con = await conectar();
      const result = await con.db(dataBase.DATA_BASE_NAME).collection(this.collection).find({}).toArray();
      await desconectar(con);
      

      return result;
      
    } catch (error) {
      throw error; 
    }
  }


  async create(register) {
    try {
      
      const con = await conectar();
      
      
      // Adicionado datas
      register.data_criacao = DateBR();
      register.data_atualizacao = DateBR();
      register._id = await autoIncremente(con, this.collection);
      
      const result = await con.db(dataBase.DATA_BASE_NAME).collection(this.collection).insertOne({ register });
      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  }


  async updateOne(_id, register) {
    try {
      
      
      // Adicionado datas
      register.data_atualizacao = DateBR();

      
      const con = await conectar();
      let result = await con.db(dataBase.DATA_BASE_NAME).collection(this.collection).findOneAndUpdate({ _id }, {$set: {...register, _id} });
      await desconectar(con);

      return result;
      
    } catch (error) {
      throw error;    
    }
  }


  async deleteOne(id) {
    try {
      

      const con = await conectar();
      const result = await con.db(dataBase.DATA_BASE_NAME).collection(this.collection).deleteOne({_id: id});
      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  }
}

export { Controller };