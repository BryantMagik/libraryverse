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
import { unpublishBook } from '@/actions/unpublish-book'
import { useDisclosure } from '@nextui-org/react'
import { publishBook } from '@/actions/publish-book'
import { myBooksAll } from '@/actions/my-books-all'

const MyBooksAll: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)

    useEffect(() => {
        myBooksAll()
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
                    setBooks(prevBooks => prevBooks.filter((book) => book.id !== bookId))
                }
            })
    }

    const editBookHandler = (book: Book) => {
        setSelectedBook(book)
        onOpen()
    }

    const publicBookHandler = (bookId: string) => {
        publishBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks(prevBooks => prevBooks.map((book) => {
                        if (book.id === bookId) {
                            return { ...book, status: 'PUBLISHED' }
                        }
                        return book
                    }))
                }
            })
    }

    const updateBookList = (updatedBook: Book) => {
        setBooks(prevBooks => prevBooks.map((book) => book.id === updatedBook.id ? updatedBook : book))
    }

    const cancelPublicBookHandler = (bookId: string) => {
        unpublishBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks(prevBooks => prevBooks.map((book) => {
                        if (book.id === bookId) {
                            return { ...book, status: 'DRAFT' }
                        }
                        return book
                    }))
                }
            })
    }
    return (
        <>
            <TitlePage title="Todas mis historias" subtitle={'Continúa escribiendo y publicando tus historias...'} />
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
                            publicBook={() => publicBookHandler(book.id)}
                            cancelPublication={cancelPublicBookHandler}
                            aria-label={`Actions for ${book.title}`}
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <ModalBody>
                            {selectedBook && <BookFormUpdate onUpdate={updateBookList} book={selectedBook} />}
                        </ModalBody>
                    </Suspense>
                </ModalContent>
            </Modal>

        </>
    )
}

export default MyBooksAll
