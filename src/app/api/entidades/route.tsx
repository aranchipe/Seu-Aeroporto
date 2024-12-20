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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
