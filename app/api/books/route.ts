import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { Book } from "@/app/types/typeBook"


export const GET = async () => {
    const data = await db.book.findMany()

    return NextResponse.json(data)
}

