"use client"

import * as React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { Book } from '@/app/types/typesModels'
import { Separator } from '@/components/ui/separator'
import { BookArtTable } from './bookArtTable'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { BookFormUpdate } from '../create/book-update-form'
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal"
import { deleteBook } from '@/actions/delete-book'
import { publishBook } from '@/actions/publish-book'
import { useDisclosure } from '@nextui-org/react'
import { myBooksAll } from '@/actions/my-books-all'
import { unpublishBook } from '@/actions/unpublish-book'
import { myBooksPublished } from '@/actions/my-books-published'
import toast from 'react-hot-toast'


const MyBooksPublic: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)

    useEffect(() => {
        myBooksPublished()
            .then((mybooks) => {
                if ('error' in mybooks) {
                    console.error('Error al obtener los últimos libros:', mybooks.error)
                } else {
                    setBooks(mybooks)
                }
            })
    }, [])

    const removeBookHandler = async (bookId: string) => {
        deleteBook(bookId)
            .then((data) => {
                if (data?.success) {
                    toast.success('Libro eliminado exitosamente')
                    setBooks(prevBooks => prevBooks.filter((book) => book.id !== bookId))
                }
            })
    }

    const editBookHandler = (book: Book) => {
        setSelectedBook(book)
        onOpen()
    }

    const updateBookList = (updatedBook: Book) => {
        setBooks(prevBooks => prevBooks.map((book) => book.id === updatedBook.id ? updatedBook : book))
    }

    const cancelPublicBookHandler = (bookId: string) => {
        unpublishBook(bookId)
            .then((data) => {
                if (data?.success) {
                    toast.success('Libro despublicado')
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
                        <BookArtTable
                            key={book.id.toString()}
                            className="w-[250px]"
                            book={book}
                            removeBook={removeBookHandler}
                            editBook={() => editBookHandler(book)}
                            cancelPublication={cancelPublicBookHandler}
                            aria-label={`Actions para ${book.title}`}
                        />
                    ))}
                </div>
            </div>
            <Modal
                size='4xl'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <ModalBody>
                            {selectedBook && <BookFormUpdate onUpdate={updateBookList} book={selectedBook} />}
                        </ModalBody>
                    </Suspense>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MyBooksPublic
