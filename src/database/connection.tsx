import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
    throw new Error("Por favor, defina a variável de ambiente MONGODB_URI");
}

const url = process.env.DATABASE_URL;
const client = new MongoClient(url, {});


export default async function connect() {
    await client.connect()

    const db = client.db('seu-aeroporto')

    return { db, client }
}

