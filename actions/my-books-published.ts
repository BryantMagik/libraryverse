"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const myBooksPublished = async () => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const mybooks = await db.book.findMany({
        where: {
            authorId: dbUser.id,
            status: 'PUBLISHED'
        },
        include: {
            author: true
        },
    })

    return mybooks
}