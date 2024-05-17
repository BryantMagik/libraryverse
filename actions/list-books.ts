"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const listBooks = async () => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }

    await db.book.findMany({})
}