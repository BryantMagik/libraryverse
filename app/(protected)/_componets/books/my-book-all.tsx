"use client"

import * as React from 'react'
import { useEffect, useState, useTransition } from 'react'
import { Book } from '@/app/types/typesModels'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { myBooksAll } from '@/actions/my-books-all'
import { BookArtTable } from './bookArtTable'


const MyBooksAll: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            myBooksAll()
                .then((mybooks) => {
                    if ('error' in mybooks) {
                        console.error('Error al obtener los últimos libros:', mybooks.error);
                    } else {
                        setBooks(mybooks)
                    }
                })
        })
    }, [])

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Mis historias
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Continúa escribiendo y editando tus historias...
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <div className="flex flex-col">
                    {books.map((book: Book) => (
                        <Link key={book.id} href={`/historias/${book.id}`}>
                            <BookArtTable key={book.id.toString()} className="w-[250px]" book={book} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyBooksAll
