import connect from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const { db } = await connect();

  try {
    const collection = db.collection('menu');
    const data = await collection.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
