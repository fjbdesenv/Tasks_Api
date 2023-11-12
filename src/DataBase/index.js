import { MongoClient } from "mongodb";
import { dataBase } from "../conf";

const client = new MongoClient(dataBase.DATA_BASE_URL);


// Consulta o próximo código para a coleção
const autoIncremente = async (con, collection) => {
  
  if (!con) throw Error("Parametro 'con' não foi informado.");
  if (!collection) throw Error("Parametro 'collection' não foi informado.");
  
  
  let document_auto_inc;
  const where = {_id: collection};
  const result = await con.db(dataBase.DATA_BASE_NAME).collection('auto_increment').findOne(where);

  
  if (!result) throw Error("Collection auto_increment não esta configurada corretamente.");
  
  
  if(result)
    document_auto_inc = await con.db(dataBase.DATA_BASE_NAME)
    .collection('auto_increment').findOneAndUpdate(where, {$inc : { auto_increment: 1 }});
  else
    document_auto_inc = await con.db(dataBase.DATA_BASE_NAME)
    .collection('auto_increment').findOneAndUpdate(where, {$set : { auto_increment: 1 }});
  

  return document_auto_inc.auto_increment;
    
};



// Cria conexão com servidor mongoDB
const conectar = () => {
  const con =  client.connect();
  console.log("Conectado com servidor mongoDB.");
  return con;
};


// Finaliza conexão com servidor mongoDB
const desconectar = async (con) => {
  if (!con) throw Error("Parametro 'con' não foi informado.");

  console.log("Desconectado com servidor mongoDB.");
  await con.close();
};


export { autoIncremente, conectar, desconectar };
