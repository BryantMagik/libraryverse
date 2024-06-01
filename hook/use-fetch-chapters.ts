"use client"

import { bookDetails } from "@/actions/book-details"
import { Book } from "@/app/types/typesModels"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useBookDetailsById = (bookId : string) => {

    const [book, setBook] = useState<Book>()

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