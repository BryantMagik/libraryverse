import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"


export async function GET() {

    const data = await db.book.findMany()
    return new Response(JSON.stringify(data))
    
}

export async function POST() {

    const role = await currentRole()

    if (role === UserRole.ADMIN) {
        return new NextResponse(null, { status: 200 })
    }

    return new NextResponse(null, { status: 403 })
}