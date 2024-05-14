import Link from 'next/link';
import React from 'react'
import { GBook, Work } from '@/app/types/typesBooks'
import { getBookById } from '@/data/book'
import { BookArtwork } from '../dashboard/bookArtwork';

interface IBook {
    book: Work | GBook;
    type: 'gbooks' | 'openlib';
}

export const Book: React.FC<IBook> = ({ book, type }) => {
    let author: string | undefined;
    let imgUrl: string | undefined;
    let title: string = '';
    let subtitle: string = '';

    if (type === 'openlib') {
        author = (book as Work).author_name?.join(', ') ?? 'Anonymous';
        imgUrl = `https://covers.openlibrary.org/b/olid/${(book as Work).cover_edition_key}-M.jpg`;
        title = (book as Work).title;
        subtitle = (book as Work).subtitle ?? '';
    } else {
        author = (book as GBook).volumeInfo.authors?.join(', ') ?? 'Anonymous';
        imgUrl = (book as GBook).volumeInfo.imageLinks?.thumbnail ?? 'https://cdn-icons-png.flaticon.com/512/166/166088.png';
        title = (book as GBook).volumeInfo.title;
        subtitle = (book as GBook).volumeInfo.subtitle ?? '';
    }

    return (
        <Link href={type === 'openlib' ? `/book/olib/${(book as Work).title}/${(book as Work).cover_edition_key}` : `/book/gbs/${(book as GBook).volumeInfo.title}/${getBookById(imgUrl)}`}>
            <BookArtwork className=''
                book={{
                    title: title,
                    coverImage: imgUrl,
                    author: { name: author },
                    subtitle: subtitle
                }}
            />
        </Link>
    )
}