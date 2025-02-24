"use server"

import { db } from "@/lib/db"

export const lastBooks = async () => {

    const latestBooks = await db.book.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: true
        },
        where: {
            status: 'PUBLISHED'
        }
    })

    return latestBooks
}