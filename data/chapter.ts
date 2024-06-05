import { db } from "@/lib/db"

export const getChapterById = async (id?: string) => {
    try {
        const chapter = await db.chapter.findUnique({ where: { id } })
        return chapter
    } catch (error) {
        return null
    }
}

export const getChapterFromBookId = async (chapterId?: string) => {
    try {
        const bookIdChapter = await db.chapter.findUnique(
            { where: { id: chapterId } }
        )
        const bookId = bookIdChapter?.bookId

        return bookId as string
    } catch (error) {
        return null
    }
}

