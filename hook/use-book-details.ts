"use client"

import { bookDetails } from "@/actions/book-details"
import { Book } from "@/app/types/typesModels"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useBookDetails = () => {

    const [book, setBook] = useState<Book>()
    const { bookId } = useParams()
    const normalizedBookId = Array.isArray(bookId) ? bookId[0] : bookId

    useEffect(() => {
        bookDetails(normalizedBookId)
            .then((fetchBook) => {
                if (fetchBook !== null) {
                    setBook(fetchBook)
                } else {
                    console.error("El libro no fue encontrado")
                }
            })
    }, [normalizedBookId])

    return book

}