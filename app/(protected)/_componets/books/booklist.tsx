import React from 'react'

import { GBook, Obras } from '@/app/types/typesBooksAPi'
import { Book } from './book'

interface IBooklist {
    books: Obras[] | GBook[]
    title?: string
    type: 'gbooks' | 'openlib'
}

export const Booklist: React.FC<IBooklist> = ({ books, title, type }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book, i) => (
                    <Book book={book} type={type} key={i} />
                ))}
            </div>
        </div>
    )
}