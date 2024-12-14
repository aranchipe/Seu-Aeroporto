import { NextResponse } from "next/server";
import connect from "@/database/connection";

export async function GET() {
    const { db } = await connect()

    try {
        const collection = db.collection("entidade");
        const data = await collection.find({}).toArray();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    }
}
