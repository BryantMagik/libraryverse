"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"
import { ChapterSchema } from "@/schemas"
import { getChapterById } from "@/data/chapter"

export const editChapter = async (chapterId: string, values: z.infer<typeof ChapterSchema>) => {

    const validatedFields = ChapterSchema.safeParse(values)

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

    const chapter = await getChapterById(chapterId)

    if (!chapter) {
        return { error: "Capítulo no encontrado" }
    }

    if (chapter.userId !== dbUser.id) {
        return { error: "No tienes permiso para editar este capítulo" }
    }

    const { title, content, order, status } = validatedFields.data

    await db.chapter.update({
        where: { id: chapterId },
        data: {
            title,
            content,
            order,
            status,
        }
    })
    return { success: "Capítulo editado correctamente" }
}