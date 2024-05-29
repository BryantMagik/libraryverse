"use server"

import * as z from "zod"
import { BookSchema } from "@/schemas"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"

export const createBook = async (values: z.infer<typeof BookSchema>) => {

    const validatedFields = BookSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Error en la validación de datos" }
    }

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Usuario no encontrado en la DB" }
    }

    const { title, description, coverImage, genre, status } = validatedFields.data

    const defaultCoverImage = '/dashboard/book-placeholder.jpg'

    await db.book.create({
        data: {
            title,
            description,
            genre,
            coverImage: coverImage || defaultCoverImage,
            authorId: dbUser.id,
            status,
        },
    })

    return {
        success: "Has creado tu propia historia correctamente",
    }
}
