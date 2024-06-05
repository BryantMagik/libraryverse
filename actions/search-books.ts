"use server"

import { db } from "@/lib/db"

export const searchBooksdb = async (query: string, mode: string) => {

    const results = await db.book.findMany({
        where: {
            OR: [
                { title: { contains: query } },
            ]
        }
    })

    if (results.length > 0) {
        return results
    } else {
        return null
    }
}