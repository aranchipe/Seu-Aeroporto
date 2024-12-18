import connect from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path'); // Obtém o parâmetro 'path'
  const segment = searchParams.get('segment'); // Obtém o parâmetro 'path'

  const { db } = await connect();

  try {
    const collection = db.collection('entidade');

    let data;

    if (path) {
      if (segment) {
        // Se 'path' estiver presente, filtra pelo valor de 'path'
        data = await collection.find({ path, 'segments.0': segment }).toArray();
      } else {
        data = await collection.find({ path }).toArray();
      }
    } else {
      // Se 'path' não estiver presente, retorna todos os documentos
      data = await collection.find({}).toArray();
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}
