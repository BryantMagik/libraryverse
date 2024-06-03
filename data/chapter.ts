import { db } from "@/lib/db"

export const getChapterById = async (id?: string) => {
    try {
        const chapter = await db.chapter.findUnique({ where: { id } })
        return chapter
    } catch (error) {
        return null
    }
}

