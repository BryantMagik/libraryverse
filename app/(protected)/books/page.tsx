"use client"
import * as React from 'react';
import { useState } from 'react';
import { GBook } from '@/app/types/typesBooks';
import { Booklist } from '../_componets/books/booklist';
import Search from '@/components/ui/search';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area'


const LibroPage = () => {

    const [books, setBooks] = useState<GBook[]>([])
    const [query, setQuery] = useState<string>('')

    const updateBooks = (newBooks: GBook[], newQuery: string) => {
        setBooks(newBooks)
        setQuery(newQuery)
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-1 md:mr-4 m">
                    <h1>Buenas, ¿Qué te gustaría <span className='text-almond-400'>leer</span> hoy?</h1>
                </div>
                <div className="space-y-1">
                    <Search updateBooks={updateBooks} />
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {books.length !== 0 ? (
                            <Booklist title={`Resultados de ${query}`} books={books} type={'gbooks'} />
                        ) : (
                            <div className="pt-8 xl:mx-[10em]">
                            </div>
                        )}
                    </div>

                </ScrollArea>
            </div>
        </>
    )
}

export default LibroPage