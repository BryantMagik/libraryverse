import Link from 'next/link'
import React, { useEffect } from 'react'
import { BookArtwork } from '../books/bookArtwork'
import { Book } from '@/app/types/typesModels'
import { listBooks } from '@/actions/list-books'

interface BookArtProps {
    book : Book
}

export const BOOKS_IMAGE_SIZE = '?fife=w480-h690'

export const BookArt: React.FC<BookArtProps> = ({ book }) => {

    const author: string | undefined = book.author?.name ?? 'Anonimo'
    const imgUrl: string | undefined = (book.coverImage ?? '/dashboard/book-placeholder.jpg') + BOOKS_IMAGE_SIZE
    const title: string = book.title
    const bookId: string = book.id ?? ''

    return (
        <Link href={`/gbook/${bookId}`}>
            <BookArtwork
                book={{
                    title: title,
                    coverImage: imgUrl,
                    author: { name: author },
                }}
            />
        </Link>
    )
}
