"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const deleteChapter = async (chapterId: string, bookId: string) => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    try {
        await db.chapter.delete({
            where:
            {
                id: chapterId,
                userId: dbUser.id,
                bookId: bookId
            }
        })

        return { success: true, message: 'Capitulo eliminado exitosamente' }

    } catch {
        return { success: false, message: 'Error al eliminar el Capitulo' }
    }
}