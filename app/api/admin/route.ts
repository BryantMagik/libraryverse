import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getIsAdmin } from "@/lib/admin"

export async function GET() {

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await db.book.findMany()
    return NextResponse.json(data)

}

export const POST = async (req : Request) => {
    const isAdmin = await currentRole()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 })

    }
    const body = await req.json();
    const { title, description, } = body;


    // if (role === UserRole.ADMIN) {
    //     return new NextResponse(null, { status: 200 })
    // }
    const data = await db.book.create({
        data: {
            title,
            description,
            status: 'DRAFT',
        }
    })

    return NextResponse.json(data)
}