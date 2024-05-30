"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const unpublishBook = async (bookId: string) => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    try {
        await db.book.update({
            where: {
                id: bookId,
                authorId: dbUser.id
            },
            data: {
                status: 'DRAFT'
            }
        })

        return { success: true, message: 'Libro despublicado exitosamente' }

    } catch {
        return { success: false, message: 'Error al despublicar el libro' }
    }
}