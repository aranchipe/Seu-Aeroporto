import { Db, MongoClient } from 'mongodb';

if (!process.env.DATABASE_URL) {
  throw new Error('Por favor, defina a variável de ambiente DATABASE_URL');
}

const url: string = process.env.DATABASE_URL;

interface MongoConnection {
  db: Db;
  client: MongoClient;
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export default async function connect(): Promise<MongoConnection> {
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient };
  }

  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db('seu-aeroporto');

    cachedClient = client;
    cachedDb = db;

    console.log('Conectado ao MongoDB com sucesso!');

    return { db, client };
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw new Error('Falha na conexão com o MongoDB.');
  }
}
