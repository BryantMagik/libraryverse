"use server"

import * as z from "zod"
import { BookSchema } from "@/schemas"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"

export const createBook = async (values: z.infer<typeof BookSchema>) => {
    console.log(values)

    const validatedFields = BookSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Error en la validación de datos"}
    }

    const user = await currentUser()

    if (!user) {
        return { error: "Usuario no autenticado." }
    }
    console.log("Usuario actual:", user)

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Usuario no encontrado en la DB" }
    }

    const { title, description, coverImage, genre, status } = validatedFields.data;

    await db.book.create({
        data: {
            title,
            description,
            genre,
            coverImage,
            authorId: dbUser.id,
            status,
        },
    })

    return {
        success: "Has creado tu propia historia correctamente",
    }
}
