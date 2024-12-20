import connect from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');
  const segment = searchParams.get('segment');

  const { db } = await connect();

  try {
    const collection = db.collection('entidade');

    let data;

    if (path) {
      if (segment) {
        data = await collection.find({ path, 'segments.0': segment }).toArray();
      } else {
        data = await collection.find({ path }).toArray();
      }
    } else {
      data = await collection.find({}).toArray();
    }
    const response = NextResponse.json(data);
    response.headers.set('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new Response(null, { headers });
}
