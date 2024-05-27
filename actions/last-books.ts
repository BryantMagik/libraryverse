"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const lastBooks = async () => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }
    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const latestBooks = await db.book.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: true
        }
    })

    return latestBooks
}