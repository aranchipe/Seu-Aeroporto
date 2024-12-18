import connect from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const { db } = await connect();

  try {
    const collection = db.collection('menu');
    const data = await collection.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}
