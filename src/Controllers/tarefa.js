import { autoIncremente, conectar, desconectar } from "../DataBase";
import { collections, variables } from "../Conf";
import { DateISO } from "../utils";


const collection = collections.TAREFAS;
const collectionUser = collections.USUARIOS;
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
      register.data_criacao = DateISO();       // Adicionado data
      register.data_atualizacao = DateISO();   // Adicionado data
      register._id = await autoIncremente(con, collection);  //Consultando o próximo código
      
      
      
        // Validação de usuário
        const id_user = register.id_user;      
        const user = await con.db(NAME).collection(collectionUser).findOne({ _id: id_user});
        if(!user) throw Error('Campo id_user não é valido.');
        
      
      
      await con.db(NAME).collection(collection).insertOne(register);
      const result = await con.db(NAME).collection(collection).findOne({ _id: register._id });
      

      await desconectar(con);


      return result;
      
    } catch (error) {
      throw error;    
    }
  },


  async updateOne(register) {
    try {
      
      register.data_atualizacao = DateISO(); // Adicionado data

      
      const con = await conectar();


      // Validação de usuário
      const _id = register._id;
      const id_user = register.id_user;      
      const user = await con.db(NAME).collection(collectionUser).findOne({ _id: id_user});
      if(!user) throw Error('Campo id_user não é valido.');
      
      
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