"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const listBooks = async () => {


    const books = await db.book.findMany({
        where: {
            status: 'PUBLISHED'
        },
        include: {
            author: true
        }
    })
    return books
}