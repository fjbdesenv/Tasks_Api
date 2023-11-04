import { MongoClient } from "mongodb";
import { dataBase } from "../conf";

const client = new MongoClient(dataBase.DATA_BASE_URL);


// Cria conexão com servidor mongoDB
const conectar = async () => {
  const con = client.connect();
  console.log("Conectado com servidor mongoDB.");
  return con;
};


// Finaliza conexão com servidor mongoDB
const desconectar = async (con) => {
  if (!con) throw Error("Parametro 'con' não foi informado.");

  console.log("Desconectado com servidor mongoDB.");
  await con.close();
};


export { conectar, desconectar };
