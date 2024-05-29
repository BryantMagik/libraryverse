"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { ChapterSchema } from "@/schemas"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"


export const createHistory = async (bookId: string, values: z.infer<typeof ChapterSchema>) => {

    const validatedFields = ChapterSchema.safeParse(values)

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

    const { title, content, order } = validatedFields.data

    await db.chapter.create({
        data: {
            bookId: bookId,
            title,
            content,
            order,
        }
    })

    return { success: true, message: 'Historial creado exitosamente' }


}