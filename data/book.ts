import { db } from "@/lib/db"

export const getBookById = async (id: string) => {

    try {
        const book = await db.book.findUnique({ where: { id } })
        return book
    } catch (error) {
        return null
    }
}