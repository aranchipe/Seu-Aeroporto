import { NextResponse } from "next/server";
import connect from "@/database/connection";

export async function GET(
    req: Request,
    { params }: {
        params: {
            entityName: string
        }
    }
) {
    const { db } = await connect()
    const { entityName } = params
    try {
        const collection = db.collection("entidade");
        const data = await collection.find({ name: entityName }).toArray();
        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    }
}


