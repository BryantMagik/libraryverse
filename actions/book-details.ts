"use server"

import { Book } from "@/app/types/typesModels"
import { db } from "@/lib/db"

export const bookDetails = async (
    bookId: string
): Promise<Book | null> => {

    try {

        const book = await db.book.findUnique({
            where: { id: bookId },
            include: { author: true,
                chapters: {
                    select: {
                        id: true,
                        bookId: true,
                    }
                }
             }
        })

        if (book) {
            return book
        } else {
            console.error('Libro no encontrado')
            return null
        }
    } catch (error) {
        console.error('Error al obtener los detalles del libro:', error)
        return null
    }
}
