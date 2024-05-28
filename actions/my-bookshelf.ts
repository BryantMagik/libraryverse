"use server"

import { getUserById } from "@/data/user"
import { db } from "@/lib/db"

export const myBookShelf = async () => {
    try {
        const user = getUserById()
        
    } catch {
        return { success: false, message: 'Error al agregar el libro al bookshelf' }
    }

}