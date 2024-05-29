import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from 'next/server'

export const GET = async (
    req: Request,
    { params }: { params: { bookId: string } }
) => {

    if (!params || !params.bookId) {
        return new NextResponse("Bad Request: ID no encontrado", { status: 400 })
    }

    const data = await db.book.findFirst({
        where: {
            id: params.bookId
            },
        include: {
            author: true,
        }
    })

    if (!data) {
        return new NextResponse("No encontrado", { status: 404 });
    }

    return NextResponse.json(data)
}

export const PUT = async (
    req: Request,
    { params }: { params: { bookId: string } }
) => {

    if (!params || !params.bookId) {
        return new NextResponse("Bad Request: ID no encontrado", { status: 400 })
    }

    const body = await req.json()
    const { title, description, coverImage, genre, tags, status } = body

    try {
        const data = await db.book.update({
            where: {
                id: params.bookId
            },
            data: {
                title,
                description,
                coverImage,
                genre,
                tags,
                status,
                updatedAt: new Date()
            },
            include: {
                author: true
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error updating book:', error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const DELETE = async (
    req: Request,
    { params }: { params: { bookId: string } }
) => {

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    if (!params || !params.bookId) {
        return new NextResponse("Bad Request: ID no encontrado", { status: 400 })
    }

    const data = await db.book.delete({
        where: {
            id: params.bookId
        }
    })

    if (!data) {
        return new NextResponse("No encontrado", { status: 404 })
    }

    return NextResponse.json(data)
}