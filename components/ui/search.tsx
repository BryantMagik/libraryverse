// "use client"
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// export default function Search({ placeholder }: { placeholder: string }) {
//     return (
//         <div className="relative flex flex-1 flex-shrink-0">
//             <label htmlFor="search" className="sr-only">
//                 Search
//             </label>
//             <input
//                 className="peer block w-full rounded-lg border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 placeholder={placeholder}
//             />
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//         </div>
//     );
// }

import { BooksApiResponse } from "@/app/types/typeBook"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from "react"

const SearchBooks = () => {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<BooksApiResponse | null>(null)

    const fetchBooks = async () => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`);
        const adata: BooksApiResponse = await response.json()
        setBooks(adata)
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0 text-black">
            <label htmlFor="search" className=""></label>
            <input
                id="search"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="peer block w-full rounded-lg border  border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Busca tu libro favorito"
                onKeyDown={e => e.key === 'Enter' && fetchBooks()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}

export default SearchBooks
