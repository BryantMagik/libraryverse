import Link from 'next/link'
import React from 'react'
import { BOOKS_IMAGE_SIZE, BOOKS_IMAGE_PATH, GBook } from '@/app/types/typesBooksAPi'
import { BookArtwork } from '../books/bookArtwork'

interface IBook {
    gbook : GBook
}

export const GBookArt: React.FC<IBook> = ({ gbook }) => {
    
    const author: string | undefined = gbook.volumeInfo.authors?.join(', ') ?? 'Anonimo'
    const title: string = gbook.volumeInfo.title
    const bookId: string = gbook.id ?? ''
    const imageLink = `${BOOKS_IMAGE_PATH}${gbook.id}${BOOKS_IMAGE_SIZE}` 

    return (
        <Link href={`/gbook/${bookId}`}>
            <BookArtwork
                book={{
                    title: title,
                    coverImage: imageLink,
                    author: { name: author },
                }}
            />
        </Link>
    )
}
