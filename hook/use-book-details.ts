"use client"

import { bookDetails } from "@/actions/book-details"
import { Book } from "@/app/types/typesModels"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useBookDetails = () => {

    const [book, setBook] = useState<Book>()
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id

    useEffect(() => {
        bookDetails(bookId)
            .then((fetchBook) => {
                if (fetchBook !== null) {
                    setBook(fetchBook)
                } else {
                    console.error("El libro no fue encontrado")
                }
            })
    }, [bookId])

    return book

}