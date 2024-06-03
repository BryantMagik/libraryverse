"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { ChapterUserStatus } from "@prisma/client"

export const getStatusChapter = async (chapterId: string): Promise<ChapterUserStatus> => {


    const user = await currentUser()

    if (!user) {
        throw new Error("Session no encontrada no encontrado.")
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        throw new Error("Usuario no encontrado.")
    }

    try {

        const data = await db.userChapterStatus.findUnique({
            where: {
                userId_chapterId: {
                    userId: dbUser.id,
                    chapterId: chapterId
                }
            }
        })

        if (!data) {
            throw new Error("No se encontró el estado del capítulo.")
        }

        return data.status

    } catch (error) {
        throw error
    }
}

