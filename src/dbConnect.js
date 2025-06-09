import { MongoClient } from 'mongodb';

// Notebook TJ
//const uri = 'mongodb://admin:admin@localhost:27017/';

// Notebook casa
const uri = 'mongodb://localhost:27017/';

let db = null;

export const connectToDatabase = async () => {
  if (db) return db;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db('alura-websockets');
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }

  return db;
};

// Função para obter a coleção de documentos (garante que já foi conectada)
export const getDocumentosColecao = () => {
    const documentosColecao = db.collection('documentos');
  if (!documentosColecao) {
    throw new Error('A conexão com o banco de dados ainda não foi estabelecida. Chame connectToDatabase() primeiro.');
  }
  return documentosColecao;
};

export default { connectToDatabase, getDocumentosColecao };