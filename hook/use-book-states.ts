import { useState, useEffect } from 'react'
import { useDisclosure } from '@nextui-org/react'
import { myBooksAll } from '@/actions/my-books-all'
import { deleteBook } from '@/actions/delete-book'
import { publishBook } from '@/actions/publish-book'
import { unpublishBook } from '@/actions/unpublish-book'
import { Book } from '@/app/types/typesModels'

interface BookStateHandlers {
    books: Book[]
    isOpen: boolean
    onOpen: () => void
    onOpenChange: () => void
    selectedBook: Book | null
    setSelectedBook: (book: Book | null) => void
    removeBookHandler: (bookId: string) => void
    editBookHandler: (book: Book) => void
    publicBookHandler: (bookId: string) => void
    updateBookList: (updatedBook: Book) => void
    cancelPublicBookHandler: (bookId: string) => void
}

export const useBookStateHandlers = (): BookStateHandlers => {
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

    return {
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
    }
}
