"use server"

import { db } from "@/lib/db"
import { Chapter } from "@prisma/client"

export const listChapter = async (bookId: string): Promise<Chapter[]> => {
    try {
        const chapters = await db.chapter.findMany({
            where: { bookId },
            include: {
                book: {
                    select: { title: true }
                }
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
