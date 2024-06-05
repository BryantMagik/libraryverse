"use server"

import { db } from "@/lib/db"
import { Book } from "@prisma/client"

export const searchBooksdb = async (query: string): Promise<Book[]> => {

    const results = await db.book.findMany({
        where: {
            OR: [
                { title: { contains: query } },
            ],
        }
    })

    if (results.length > 0) {
        return results
    } else {
        console.error('No se encontraron libros')
        return []
    }

}