import Link from 'next/link'
import React from 'react'
import { GBook } from '@/app/types/typesBooksAPi'
import { BookArtwork } from '../dashboard/bookArtwork'

interface IBook {
    book: GBook
}

export const BOOKS_IMAGE_SIZE = '?fife=w480-h690'

export const Book: React.FC<IBook> = ({ book }) => {
    
    const author: string | undefined = book.volumeInfo.authors?.join(', ') ?? 'Anonymous'
    const imgUrl: string | undefined = (book.volumeInfo.imageLinks?.thumbnail ?? '/dashboard/book-placeholder.jpg') + BOOKS_IMAGE_SIZE
    const title: string = book.volumeInfo.title
    const bookId: string = book.id ?? ''

    return (
        <Link href={`/book/${bookId}`}>
            <BookArtwork
                book={{
                    title: title,
                    coverImage: imgUrl,
                    author: { name: author },
                }}
            />
        </Link>
    );
};
