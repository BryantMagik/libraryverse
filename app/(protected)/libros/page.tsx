"use client"
import * as React from 'react';
import { useState } from 'react';
import { GBook } from '@/app/types/typesBooks';
import { Booklist } from '../_componets/books/booklist';
import Search from '@/components/ui/search';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface LibroPageProps { }

const LibroPage: React.FC<LibroPageProps> = () => {
    const [books, setBooks] = useState<GBook[]>([])
    const [query, setQuery] = useState<string>('')

    const updateBooks = (newBooks: GBook[], newQuery: string) => {
        setBooks(newBooks);
        setQuery(newQuery);
    }

    return (
        <>
            <div className="flex items-center justify-between">
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
                    <ScrollBar orientation='horizontal' />

                </ScrollArea>
            </div>

        </>
    );
};

export default LibroPage;