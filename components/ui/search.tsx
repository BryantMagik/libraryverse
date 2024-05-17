import { FormEvent, KeyboardEvent, useState } from 'react';
import { Input } from '../librarys/Input';
import { Button } from '../librarys/Button';
import { GBook } from '@/app/types/typesBooksAPi';

interface SearchProps {
    updateBooks: (books: GBook[], query: string) => void;
}

const Search: React.FC<SearchProps> = ({ updateBooks }) => {
    const [title, setTitle] = useState<string>('');
    const [books, setBooks] = useState<GBook[]>([]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&orderBy=relevance&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_KEY}&maxResults=20`
        );
        const data = await response.json();
        const fetchedBooks: GBook[] = data.items;
        setBooks(fetchedBooks);
        updateBooks(fetchedBooks, title);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.length === 1) {
            console.log('clear');
            setBooks([]);
        }
        if (e.key === 'Enter') {
            onSubmit(e as unknown as FormEvent<HTMLFormElement>);
        }
    }
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <form onSubmit={onSubmit}>
                <div className="flex flex-row w-96">
                    <Input hasLabel={false} placeholder={'Introduce el nombre del libro o autor que buscas'} onChange={(e) => setTitle(e.target.value)} handleKeyPress={handleKeyPress} />
                    <Button type="submit">Buscar</Button>
                </div>
            </form>
        </div>
    )
}

export default Search;
