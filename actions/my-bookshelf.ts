"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const myBookShelf = async () => {

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }

    const dbuser = await getUserById(user.id)

    if (!dbuser) {
        return { error: "Usuario no autenticado." }
    }

    const bookshelf = await db.userBook.findMany({
        where: {
            userId: user.id,
        },
        include: {
            book: {
                include: {
                    author: true
                }
            }
        }
    })
    return bookshelf
}