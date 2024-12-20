import connect from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const { db } = await connect();

  try {
    const collection = db.collection('menu');
    const data = await collection.find({}).toArray();

    // Criando a resposta e adicionando os cabeçalhos de CORS
    const response = NextResponse.json(data);
    response.headers.set('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

// Lidar com o método OPTIONS
export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new Response(null, { headers });
}
