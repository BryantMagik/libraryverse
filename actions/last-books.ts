"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const lastBooks = async () => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }
    const latestBooks = await db.book.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: true
        }
    })

    return latestBooks
}