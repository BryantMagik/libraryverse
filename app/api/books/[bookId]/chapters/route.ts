import { getBookById } from "@/data/book"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}