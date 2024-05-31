import { db } from "@/lib/db"
import { Book } from '@/app/types/typesModels'

export const getBookById = async (id?: string) => {
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

export const getTitleFromBook = async (bookId: string) => {
    try {
        const book: Book | null = await db.book.findUnique({ where: { id: bookId }, include: { author: true } })
        return book ? book.title : null;

    } catch (error) {
        return null
    }
}