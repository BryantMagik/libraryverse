"use client"


import * as React from 'react'
import { useEffect, useState, useTransition } from 'react'
import { Book } from '@/app/types/typesModels'
import { mybooks } from '@/actions/list-mybooks'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { BookArtwork } from '../bookArtwork'


const MyBooks: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            mybooks()
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
                        Tus historias
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Continúa escribiendo y editando tus historias...
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <div className="flex space-x-4 pb-4">
                    {books.map((book: Book) => (
                        <Link key={book.id} href={`/historias/${book.id}`}>
                            <BookArtwork key={book.id.toString()} className="w-[250px]" book={book} width={250} height={330} aspectRatio='portrait' />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyBooks
