import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { searchBooksdb } from '@/actions/search-books'
import { Book } from '@/app/types/typesModels'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function SearchModal({ placeholder }: { placeholder: string }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Book[] | null>(null)
    const [showResults, setShowResults] = useState(false)

    function handleSearch(term: string) {
        setQuery(term)
    }

    useEffect(() => {
        if (query) {
            searchBooksdb(query)
                .then((results) => {
                    if (results) {
                        setResults(results)
                    } else {
                        setResults([])
                    }
                    setShowResults(true)
                })
                .catch((error) => {
                    setResults([])
                    setShowResults(false)
                })
        } else {
            setResults([])
            setShowResults(false)
        }
    }, [query])

    

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <input
                className="w-[160px] md:w-auto rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            {showResults && results && results.length > 0 && (
                <div
                    className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ul>
                        {results.map((book) => (
                            <>
                                <li key={book.id} className="grid grid-cols-2 p-2 hover:bg-gray-100">
                                    <Image src={book.coverImage || ""} className="w-[28px] h-[43px] rounded-none" width={30} height={200} alt={book.title} />
                                    <a href={`/book/${book.id}`}>{book.title}</a>
                                </li>
                                <Button key={book.id}  className="rounded-none w-auto h-[60px] flex items-start dark:bg-emerald-500 bg-library-500 hover:bg-library-700 dark:hover:bg-emerald-700 dark:text-white">
                                    <Image className="w-[28px] h-[43px] rounded-none" width={30} height={200} src={book.coverImage || ""} alt={book.title} />
                                    <span className="flex flex-col items-start">
                                        <span className="text-left text-[10px] pl-2">{book.title}</span>
                                        <span className="text-left text-[10px] pl-2">{book.author?.name}</span>
                                    </span>
                                </Button>
                            </>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
