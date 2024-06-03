"use server"

import { db } from "@/lib/db"
import { BookSchema } from "@/schemas"
import { z } from "zod"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"
import { getBookById } from "@/data/book"

export const editBooks = async (bookId: string, values: z.infer<typeof BookSchema>) => {

    const validatedFields = BookSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Los campos proporcionados no son válidos" }
    }
    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    const book = await getBookById(bookId)

    if (!book) {
        return { error: "Libro no encontrado" }
    }

    if (book.authorId !== dbUser.id) {
        return { error: "No tienes permiso para editar este libro" }
    }

    const defaultCoverImage = '/dashboard/book-placeholder.jpg'

    const { title, description, coverImage, genre, status } = validatedFields.data

    await db.book.update({
        where: { id: bookId },
        data: {
            title,
            description,
            genre,
            coverImage: coverImage || defaultCoverImage,
            authorId: dbUser.id,
            status,
        }
    })
    return { success: "Libro editado correctamente" }
}


