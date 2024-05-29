"use server"

import { db } from "@/lib/db"

export const deleteBook = async (bookId: string, userId: string) => {

    try {
        await db.book.delete({
            where:
            {
                id: bookId,
                authorId: userId
            }
        })

        return { success: true, message: 'Libro eliminado exitosamente' }

    } catch {
        return { success: false, message: 'Error al eliminar el libro' }
    }
}