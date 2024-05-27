"use client"
import * as React from 'react'
import { useEffect, useState } from 'react'
import Search from '@/app/(protected)/_componets/searchBook/search'
import { Pagination } from "@nextui-org/pagination"
import { GBook } from '@/app/types/typesBooksAPi'
import { Booklist } from '../_componets/searchBook/booklist'
import { Separator } from '@/components/ui/separator'


const LibroPage = () => {
    
    const [books, setBooks] = useState<GBook[]>([])
    const [query, setQuery] = useState<string>('')
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)

    const updateBooks = (newBooks: GBook[], newQuery: string, totalItems: number) => {
        setBooks(newBooks ?? [])
        setQuery(newQuery ?? '')
        setSearchPerformed(true)
        setTotalPages(Math.ceil(totalItems / 10))
        setPage(0)
    }

    const handlePageChange = async (newPage: number) => {
        setPage(newPage)
        const startIndex = newPage * 10
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=10&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_KEY}`
            )
            const data = await response.json()
            const fetchedBooks: GBook[] = data.items || []
            updateBooks(fetchedBooks, query, data.totalItems || 0)
        } catch (error) {
            console.error("Error fetching books:", error)
        }
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
                <div className="flex space-x-4 pb-4">
                    {books.length !== 0 ? (
                        <Booklist title={`Resultados de ${query}`} books={books} />
                    ) : (
                        searchPerformed && (
                            <div className="pt-8 xl:mx-[10em] text-center">
                                <p className="text-lg text-gray-500">No se encontraron libros para &quot;{query}&quot;.</p>
                                <p className="text-sm text-gray-400">Intenta con una búsqueda diferente.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Pagination showControls total={totalPages} initialPage={page} onChange={handlePageChange} />
        </>
    )
}

export default LibroPage

