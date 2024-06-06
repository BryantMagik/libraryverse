import { useEffect, useState } from 'react'
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { GBook } from '@/app/types/typesBooksAPi'
import { Select, SelectItem } from "@nextui-org/select"
import { GenreEnum } from '@/schemas'

interface SearchProps {
    updateBooks: (books: GBook[], query: string) => void
}
const genres = Object.keys(GenreEnum.Values);
const Search: React.FC<SearchProps> = ({ updateBooks }) => {
    const [title, setTitle] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [books, setBooks] = useState<GBook[]>([])
    const [changeCount, setChangeCount] = useState<number>(0)
    const [page, setPage] = useState<number>(0)

    const maxResults = 10

    const searchBooks = async () => {

        let searchQuery = `intitle:${title}`;
        if (category) {
            searchQuery += `+subject:${category}`;
        }
        const startIndex = page * maxResults;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=relevance&startIndex=${startIndex}&maxResults=${maxResults}&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_KEY}`
        )
        const data = await response.json();
        const fetchedBooks: GBook[] = data.items || []
        setBooks(fetchedBooks)
        updateBooks(fetchedBooks, `${title} - ${category}`);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        setChangeCount(changeCount + 1)
        setPage(0)
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
        setChangeCount(changeCount + 1)
        setPage(0)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            searchBooks()
        }, 300)

        return () => clearTimeout(timer);
    }, [changeCount, page])

    const handleNextPage = () => {
        setPage(page + 1)
    }

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <div>
                <Input placeholder="Buscar por título..." onChange={handleTitleChange} value={title} />
                <Select label="Buscar por categoría" value={category} onChange={handleCategoryChange} className="max-w-xs">
                    {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                            {genre}
                        </SelectItem>
                    ))}
                </Select>
                <Button onClick={searchBooks}>Buscar</Button>
                <div className="mt-4 flex justify-between">
                    <Button onClick={handlePrevPage} disabled={page === 0}>
                        Página Anterior
                    </Button>
                    <Button onClick={handleNextPage}>
                        Siguiente Página
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Search;
