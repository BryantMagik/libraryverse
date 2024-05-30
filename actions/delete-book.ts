"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const deleteBook = async (bookId: string) => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    try {
        await db.book.delete({
            where:
            {
                id: bookId,
                authorId: dbUser.id
            }
        })

        return { success: true, message: 'Libro eliminado exitosamente' }

    } catch {
        return { success: false, message: 'Error al eliminar el libro' }
    }
}