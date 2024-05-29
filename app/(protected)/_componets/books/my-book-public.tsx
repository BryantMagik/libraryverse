"use client"

import * as React from 'react'
import { useEffect, useState, useTransition } from 'react'
import { Book } from '@/app/types/typesModels'
import { Separator } from '@/components/ui/separator'
import { myBooksPublished } from '@/actions/my-books-published'
import { BookArtTable } from './bookArtTable'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { user } from '@nextui-org/theme'
import { useCurrentUser } from '@/hook/use-current-user'
import { deleteBook } from '@/actions/delete-book'


const MyBooksPublic: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const [isPending, startTransition] = useTransition()
    const user = useCurrentUser()

    useEffect(() => {
        startTransition(() => {
            myBooksPublished()
                .then((mybooks) => {
                    if ('error' in mybooks) {
                        console.error('Error al obtener los últimos libros:', mybooks.error);
                    } else {
                        setBooks(mybooks)
                    }
                })
        })
    }, [])

    const removeBookHandler = async (bookId: string) => {
        console.log('Eliminado', bookId)
        if(user.session?.id) {
            deleteBook(bookId, user.session?.id)
                .then((data) => {
                    if (data?.success) {
                        setBooks(books.filter((book) => book.id !== bookId))
                    }
                })
        }
    }

    const editBookHandler = (bookId: string) => {

    }

    return (
        <>
            <TitlePage title="Mis Historias" subtitle={'Historias Publicadas'} />
            <Separator className="my-4" />
            <div className="relative">
                <div className="flex flex-col">
                    {books.map((book: Book) => (
                        <BookArtTable key={book.id.toString()} className="w-[250px]" book={book} removeBook={removeBookHandler} editBook={editBookHandler} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyBooksPublic
