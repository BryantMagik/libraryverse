import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {

    const data = await db.book.findMany({
        include: {
            author: true
        }
    })
    return NextResponse.json(data)

}

export const POST = async (req: Request) => {

    const body = await req.json()
    const { title, description, coverImage, genre, authorId } = body

    const data = await db.book.create({
        data: {
            title,
            description,
            coverImage,
            genre,
            authorId,
            status: "DRAFT",
        }
    })

    return NextResponse.json(data)
}