"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"
import { ChapterSchema } from "@/schemas"

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

    

   

}