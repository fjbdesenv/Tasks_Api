import { MongoClient } from "mongodb";
import { variables } from "../conf";


const { NAME, URL } = variables.DATA_BASE;
const client = new MongoClient(URL);


// Consulta o próximo código para a coleção
const autoIncremente = async (con, collection) => {
  
  if (!con) throw Error("Parametro 'con' não foi informado.");
  if (!collection) throw Error("Parametro 'collection' não foi informado.");
  
  
  let document_auto_inc;
  const where = {_id: collection};
  const result = await con.db(NAME).collection('auto_increment').findOne(where);

  
  if (!result) throw Error("Collection auto_increment não esta configurada corretamente.");
  
  
  await con.db(NAME).collection('auto_increment').updateOne(where, {$inc : { auto_increment: 1 }});
  document_auto_inc = await con.db(NAME).collection('auto_increment').findOne(where);


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
