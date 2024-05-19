import Link from 'next/link';
import React from 'react'
import { GBook, Obras } from '@/app/types/typesBooksAPi'
import { getBookById } from '@/data/book'
import { BookArtwork } from '../dashboard/bookArtwork'

interface IBook {
    book: Obras | GBook;
    type: 'gbooks' | 'openlib';
}
export const BOOKS_IMAGE_SIZE = '?fife=w480-h690'

export const Book: React.FC<IBook> = ({ book, type }) => {
    let author: string | undefined;
    let imgUrl: string | undefined;
    let title: string = '';

    if (type === 'openlib') {
        author = (book as Obras).author_name?.join(', ') ?? 'Anonymous';
        imgUrl = `https://covers.openlibrary.org/b/olid/${(book as Obras).cover_edition_key}-M.jpg${BOOKS_IMAGE_SIZE}`;
        title = (book as Obras).title;
    } else {
        author = (book as GBook).volumeInfo.authors?.join(', ') ?? 'Anonymous';
        imgUrl = ((book as GBook).volumeInfo.imageLinks?.thumbnail ?? '/dashboard/book-placeholder.jpg') + BOOKS_IMAGE_SIZE;
        title = (book as GBook).volumeInfo.title;
    }

    return (
        <Link href={type === 'openlib' ? `/book/olib/${(book as Obras).title}/${(book as Obras).cover_edition_key}` : `/book/gbs/${(book as GBook).volumeInfo.title}/${getBookById(imgUrl)}`}>
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