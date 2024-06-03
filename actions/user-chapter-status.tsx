"use server"

import { db } from "@/lib/db"
import { ChapterUserStatus } from "@prisma/client"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"

export const updateChapterStatus = async (chapterId: string, status: ChapterUserStatus): Promise<ChapterUserStatus> => {

    const user = await currentUser()

    if (!user) {
        throw new Error("Session no encontrada no encontrado.")
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        throw new Error("Usuario no encontrado.")
    }


    try {
        const existingStatus = await db.userChapterStatus.findUnique({
            where: {
                userId_chapterId: {
                    userId: dbUser.id,
                    chapterId,
                }
            }
        })

        if (existingStatus) {
            await db.userChapterStatus.update({
                where: {
                    userId_chapterId: {
                        userId: dbUser.id,
                        chapterId,
                    }
                },
                data: {
                    status,
                }
            })
        } else {
            await db.userChapterStatus.create({
                data: {
                    userId: dbUser.id,
                    chapterId,
                    status,
                },
                select: {
                    status: true
                }
            })
        }

        if (!existingStatus) {
            throw new Error("No se pudo encontrar el estado del capítulo.")
        }

        return existingStatus.status
        
    } catch (error) {
        console.error("Error al actualizar el estado.", error)
        throw error
    }
}
