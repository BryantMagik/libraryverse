import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: any) {

    const { bookId } = req.params

    const chapters = await db.chapter.findMany({
        where: {
            bookId: bookId
        }
    })

    return NextResponse.json(chapters)

}

