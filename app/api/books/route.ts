import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { currentRole } from "@/lib/auth"
import { getIsAdmin } from "@/lib/admin"

export async function GET() {

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await db.book.findMany({
        include:{
            author: true
        }
    })
    return NextResponse.json(data)

}

export const POST = async (req: Request) => {
    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 })

    }
    const body = await req.json()
    const { title, description, coverImage, genre, authorId  } = body

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