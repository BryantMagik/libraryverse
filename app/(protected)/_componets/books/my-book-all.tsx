"use client"

import * as React from 'react'
import { Suspense } from 'react'
import { Book } from '@/app/types/typesModels'
import { Separator } from '@/components/ui/separator'
import { BookArtTable } from './bookArtTable'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { BookFormUpdate } from '../create/book-update-form'
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal"
import { useBookStateHandlers } from '@/hook/use-book-states'

const MyBooksAll: React.FC = () => {
    const {
        books,
        isOpen,
        onOpen,
        onOpenChange,
        selectedBook,
        setSelectedBook,
        removeBookHandler,
        editBookHandler,
        publicBookHandler,
        updateBookList,
        cancelPublicBookHandler
    } = useBookStateHandlers()
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
                            publicBook={publicBookHandler}
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
