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
