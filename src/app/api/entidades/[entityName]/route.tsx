/* eslint-disable @typescript-eslint/ban-ts-comment */
import connect from '@/libs/mongodb';
import { NextResponse } from 'next/server';
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      entityName: string; // Defina explicitamente o tipo de 'entityName'
    };
  },
) {
  const { db } = await connect();
  const { entityName } = params;
  try {
    const collection = db.collection('entidade');
    const data = await collection.find({ name: entityName }).toArray();
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
