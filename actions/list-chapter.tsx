"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Chapter } from "@prisma/client"

export const listChapter = async (bookId: string): Promise<Chapter[]> => {

    const user = await currentUser()

    if (!user) {
        throw new Error("Session no encontrada no encontrado.")
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        throw new Error("Usuario no encontrado.")
    }


    try {
        const chapters = await db.chapter.findMany({
            where: { bookId },
            include: {
                book: {
                    select: { 
                        id: true,
                        title: true, 
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                
                
            }
        })

        if (!chapters) {
            throw new Error("Chapters not found.")
        }

        return chapters
    } catch (error) {
        console.error("Error fetching chapters:", error)
        throw error
    }
}