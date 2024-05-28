import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    const chapters = await db.chapter.findMany({
        include: {
            book:true
        }
    })

    return NextResponse.json(chapters)
}

