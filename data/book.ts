import { db } from "@/lib/db"

export const getBookById = async (id: string) => {
    try {
        const book = await db.book.findUnique({ where: { id } })
        return book
    } catch (error) {
        return null
    }
}

export const getBookFromBookshelfById = async (bookId: string, userId: string) => {
    try {
        const userBook = await db.userBook.findFirst({
            where: {
                userId,
                bookId,
            },
            include: {
                book: true,
            }
        })
        return userBook
    } catch (error) {
        return null
    }
}