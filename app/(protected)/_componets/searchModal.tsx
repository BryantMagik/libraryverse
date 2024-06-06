import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { searchBooksdb } from '@/actions/search-books'
import { Book } from '@/app/types/typesModels'
import Image from 'next/image'
import Link from 'next/link'

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
        <>
            <div className="relative flex-1 flex-shrink-0 hidden md:inline">
                <input
                    className="w-[300px] rounded-md border border-library-500 dark:border-emerald-700 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-emerald-500"
                    placeholder={placeholder}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] -translate-y-1/2 dark:text-emerald-500 text-gray-500 peer-focus:text-gray-900" />
                {showResults && results && results.length > 0 && (
                    <div
                        className="absolute top-full left-0 w-full dark:bg-black  border border-gray-200 rounded-md shadow-md mt-1 z-10"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <ul>
                            {results.map((book) => (
                                <>
                                    <li key={book.id} className="flex flex-row items-start dark:hover:bg-emerald-800 p-2">
                                        <Image src={book.coverImage || ""} className="w-[28px] h-[43px] rounded-none" width={30} height={200} alt={book.title} />
                                        <Link className='text-[15px] pl-2' href={`/book/${book.id}`}>{book.title}</Link>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}
