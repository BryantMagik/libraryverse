"use server"

import { getBookFromBookshelfById } from "@/data/book"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const addBookShelf = async (bookId: string, userId: string) => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }


    try {
        const existingBook = await getBookFromBookshelfById(bookId, userId)

        if (existingBook) {
            return { error: "El libro ya está en el bookshelf" }
        }

        await db.userBook.create({
            data: {
                bookId,
                userId
            }
        })
        return { success: true, message: 'Libro agregado al bookshelf exitosamente' }

    } catch {
        return { success: false, message: 'Error al agregar el libro al bookshelf' }
    }
}
