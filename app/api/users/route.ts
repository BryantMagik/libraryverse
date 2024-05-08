import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {

    const isAdmin = await getIsAdmin()

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await db.user.findMany()
    return NextResponse.json(data)

}