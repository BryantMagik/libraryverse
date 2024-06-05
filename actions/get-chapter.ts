"use server"

import { db } from "@/lib/db"
import { Chapter } from "@prisma/client"

export const getChapter = async (chapterId: string): Promise<Chapter[]> => {
    try {
        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
            },
            include: {
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })


        if (!chapter) {
            throw new Error("Chapters not found.")
        }

        return [chapter]
    } catch (error) {
        console.error("Error fetching chapters:", error)
        throw error
    }
}
