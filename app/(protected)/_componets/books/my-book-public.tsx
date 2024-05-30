"use client"

import * as React from 'react'
import { useEffect, useState } from 'react'
import { Book } from '@/app/types/typesModels'
import { Separator } from '@/components/ui/separator'
import { myBooksPublished } from '@/actions/my-books-published'
import { BookArtTable } from './bookArtTable'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { deleteBook } from '@/actions/delete-book'
import { unpublishBook } from '@/actions/unpublish-book'
import { BookFormUpdate } from '../create/book-update-form'


const MyBooksPublic: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        myBooksPublished()
            .then((mybooks) => {
                if ('error' in mybooks) {
                    console.error('Error al obtener los últimos libros:', mybooks.error);
                } else {
                    setBooks(mybooks)
                }
            })
    }, [])

    const removeBookHandler = async (bookId: string) => {
        console.log('Eliminado', bookId)
        deleteBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks(books.filter((book) => book.id !== bookId))
                }
            })

    }

    const editBookHandler = (bookId: string) => {

    }

    const cancelPublicBookHandler = (bookId: string) => {
        unpublishBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
                }
            })
    }

    return (
        <>
            <TitlePage title="Mis Historias" subtitle={'Historias Publicadas'} />
            <Separator className="my-4" />
            <div className="relative">
                <div className="flex flex-col">
                    {books.map((book: Book) => (
                        <BookArtTable key={book.id.toString()} className="w-[250px]" book={book} removeBook={removeBookHandler} editBook={editBookHandler} cancelPublication={cancelPublicBookHandler} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyBooksPublic
