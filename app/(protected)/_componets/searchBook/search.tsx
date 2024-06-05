import { useEffect, useState } from 'react'
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { GBook } from '@/app/types/typesBooksAPi'
import { Select, SelectItem } from "@nextui-org/select"
import { GenreEnum } from '@/schemas'
import { Book, GenreEnumESP } from '@/app/types/typesModels'

interface SearchProps {
    updateBooks: (books: GBook[], query: string, totalItems: number) => void
}

const Search: React.FC<SearchProps> = ({ updateBooks }) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [books, setBooks] = useState<(GBook | Book)[]>([])
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [searchMode, setSearchMode] = useState<'all' | 'title' | 'author' | 'category' | 'publisher'>('title')

    const maxResults = 10
    
    const searchBooks = async () => {
        let searchQuery = ''

        if (searchMode === 'title' && searchTerm) {
            searchQuery = `intitle:${searchTerm}`
        } else if (searchMode === 'category' && category) {
            searchQuery = `subject:${category}`
        } else if (searchMode === 'author' && searchTerm) {
            searchQuery = `inauthor:${searchTerm}`
        } else if (searchMode === 'publisher' && searchTerm) {
            searchQuery = `inpublisher:${searchTerm}`
        } else if (searchMode === 'all' && searchTerm) {
            searchQuery = `${searchTerm}`
        }

        setPage(0)
        const startIndex = 0

        if (!searchQuery.trim()) {
            console.warn("Necesita una búsqueda")
            return
        }
        const cachedResults = sessionStorage.getItem(searchQuery)

        if (cachedResults) {
            const parsedResults = JSON.parse(cachedResults)
            setBooks(parsedResults.books)
            updateBooks(parsedResults.books, searchQuery, parsedResults.totalItems)
            setTotalPages(Math.ceil(parsedResults.totalItems / maxResults))
            return
        }

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_KEY}`
        )
        const data = await response.json()

        const fetchedBooks: GBook[] = data.items || []

        setBooks(fetchedBooks)
        updateBooks(fetchedBooks, searchQuery, data.totalItems || 0)
        setTotalPages(Math.ceil((data.totalItems || 0) / maxResults))

        sessionStorage.setItem(searchQuery, JSON.stringify({
            books: fetchedBooks,
            totalItems: data.totalItems || 0
        }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setPage(0)
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
        setPage(0)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            searchBooks()
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm, category, page, searchMode])

    const handleSearchModeChange = (mode: 'all' | 'title' | 'author' | 'category' | 'publisher') => {
        if (searchMode === mode) return
        setSearchMode(mode)
        setSearchTerm('')
        setCategory('')
        setPage(0)
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0 flex-col">
            {searchMode !== 'category' && (
                <Input
                    placeholder={
                        searchMode === 'title' ? "Buscar por título..." :
                            searchMode === 'author' ? "Buscar por autor..." :
                                searchMode === 'publisher' ? "Buscar por editorial..." :
                                    "Buscar..."
                    }
                    onChange={handleInputChange}
                    value={searchTerm}
                />
            )}
            {searchMode === 'category' && (
                <div className="flex flex-col items-center">
                    <Select
                        label="Categoría"
                        value={category}
                        onChange={handleSelectChange}
                        className="max-w-xs"
                    >
                        {GenreEnum.options.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                                {GenreEnumESP[genre]}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            )}
            <div className="flex justify-around mb-4">
                <Button
                    onClick={() => handleSearchModeChange('all')}
                    className={`bg-library-300 text-white ${searchMode === 'all' ? 'active:bg-library-600 text-white' : ''}`}
                >
                    Todos
                </Button>
                <Button
                    onClick={() => handleSearchModeChange('title')}
                    className={`bg-library-300 text-white ${searchMode === 'title' ? 'active:bg-library-600 text-white' : ''}`}
                >
                    Por Titulo
                </Button>
                <Button
                    onClick={() => handleSearchModeChange('author')}
                    className={`bg-library-300 text-white ${searchMode === 'author' ? 'active:bg-library-700 text-white' : ''}`}
                >
                    Por Autor
                </Button>
                <Button
                    onClick={() => handleSearchModeChange('category')}
                    className={`bg-library-300 text-white ${searchMode === 'category' ? 'active:bg-library-600 text-white' : ''}`}
                >
                    Por Categoria
                </Button>
                <Button
                    onClick={() => handleSearchModeChange('publisher')}
                    className={`bg-library-300 text-white ${searchMode === 'publisher' ? 'active:bg-library-600 text-white' : ''}`}
                >
                    Por Editora
                </Button>
            </div>
        </div>
    )
}

export default Search
