import React from 'react'

import { GBook } from '@/app/types/typesBooksAPi'
import { GBookArt } from './gbookArt'
import { Book } from '@/app/types/typesModels'
import { BookArt } from './bookArt'

interface IBooklist {
    books: (GBook | Book)[]
    title?: string
}

export const Booklist: React.FC<IBooklist> = ({ books, title }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book, i) => (
                    'id' in book ? (
                        <GBookArt gbook={book as GBook} key={i} />
                    ) : (
                        <BookArt book={book as Book} key={i} />
                    )
                ))}
            </div>
        </div>
    )
}