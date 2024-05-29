"use server"

import { getBookFromBookshelfById } from "@/data/book"
import { db } from "@/lib/db"

export const removeBookshelf = async (bookId: string, userId: string) => {
    try {
        const existingBook = await getBookFromBookshelfById(bookId, userId)

        if (!existingBook) {
            return { error: "El libro no está en el bookshelf" }
        }

        await db.userBook.delete({
            where:
            {
                userId_bookId:
                    { userId, bookId },
            }
        })

        return { success: true, message: 'Libro agregado al bookshelf exitosamente' }

    } catch {
        return { success: false, message: 'Error al agregar el libro al bookshelf' }
    }
}
