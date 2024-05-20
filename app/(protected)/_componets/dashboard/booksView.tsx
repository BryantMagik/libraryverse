"use client"

import * as React from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { BookArtwork } from './bookArtwork'
import { useEffect, useState, useTransition } from 'react'
import { Book } from '@/app/types/typesModels'
import { lastBooks } from '@/actions/last-books'
import Link from 'next/link'

const BooksView: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            lastBooks()
                .then((latestBooks) => {
                    if ('error' in latestBooks) {
                        console.error('Error al obtener los últimos libros:', latestBooks.error);
                    } else {
                        setBooks(latestBooks)
                    }
                })
        })
    }, [])

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Historias Actualizadas Recientemente
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Descubre las últimas actualizaciones...
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {books.map((book) => (
                            <Link key={book.id} href={`/dashboard/${book.id}`}>
                                <BookArtwork key={book.id.toString()} book={book} width={300} height={300} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex space-x-4 pb-4">

                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                <div className='mt-6 space-y-1'>
                    <h2 className='text-2xl font-semibold tracking-tight'>
                        Más populares
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        Descubre las historias más populares...
                    </p>
                </div>
                <Separator className='my-4' />
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">

                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>
        </div>
    )
}

export default BooksView
