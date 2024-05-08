import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    if (!params || !params.userId) {
        return new NextResponse("Bad Request", { status: 400 })
    }

    const data = await db.user.findFirst({
        where: {
            id: params.userId
        }
    })

    if (!data) {
        return new NextResponse("Not Found", { status: 404 })
    }
    return NextResponse.json(data)

}

export const PUT = async (req: Request, { params }: { params: { userId: string } }) => {
    const isAdmin = await getIsAdmin()
    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    if (!params || !params.userId) {
        return new NextResponse("Bad Request", { status: 400 })
    }

    const body = await req.json()

    const data = await db.user.update({
        where: {
            id: params.userId
        },
        data: body
    })

    if (!data) {
        return new NextResponse("No encontrado", { status: 404 })
    }

    return NextResponse.json(data)
}

export const DELETE = async (req: Request, { params }: { params: { userId: string } }) => {

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 })
    }
    if (!params || !params.userId) {
        return new NextResponse("Bad Request", { status: 400 })
    }

    const data = await db.user.delete({
        where: {
            id: params.userId
        }
    })

    if (!data) {
        return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(data)
}