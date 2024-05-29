import { myBookShelf } from "@/actions/my-bookshelf"
import { Book } from "@prisma/client"
import { useEffect, useState } from "react"


export const useMyBookshelf = () => {
    
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        myBookShelf()
            .then((mybooks) => {
                if ('error' in mybooks) {
                    console.error('Error al obtener los últimos libros:', mybooks.error)
                } else {
                    const extractedBooks = mybooks.map((item) => ({
                        ...item.book,
                    }))
                    setBooks(extractedBooks)
                }
            })
    }, [])
    return books
}