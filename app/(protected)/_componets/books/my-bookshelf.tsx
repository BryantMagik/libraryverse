
import * as React from 'react'
import { Book } from '@/app/types/typesModels'
import { useEffect, useState } from 'react'
import { myBookShelf } from '@/actions/my-bookshelf'
import { Separator } from '@/components/ui/separator'
import { BookArtTableBookshelf } from './bookArtTableBookshelf'
import { removeBookshelf } from '@/actions/remove-bookshelf'
import { useCurrentUser } from '@/hook/use-current-user'
import toast from 'react-hot-toast'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { Loading } from '../loading/loading'

const MyBookShelf: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const user = useCurrentUser()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        myBookShelf()
            .then((mybooks) => {
                if ('error' in mybooks) {
                    console.error('Error al obtener los últimos libros:', mybooks.error);
                } else {
                    const extractedBooks = mybooks.map((item) => ({
                        ...item.book,
                    }))
                    setBooks(extractedBooks)
                }
                setLoading(false)
            })
    }, [])

    if(loading){
        return <div><Loading label='Cargando tus libros favoritos'/></div>
    }

    const removeBookHandler = async (bookId: string) => {
        if (user.session?.id) {
            removeBookshelf(bookId, user.session?.id)
                .then((data) => {
                    if (data?.success) {
                        toast.success('Libro eliminado exitosamente')
                        setBooks(books.filter((book) => book.id !== bookId))
                    }
                    if (data?.error) {
                        toast.error('Este libro no se encuentra en el bookshelf')
                    }
                })
        }
    }

    return (
        <>
            <TitlePage title="Mi Bookshelf" subtitle="Historias que te mantendrán al borde de tu asiento. ¿Listo para continuar leyendo?" />   
            <Separator className='my-4' />
            <div className='relative'>
                <div className="flex flex-col">
                    {books.map((book: Book) => (
                        <BookArtTableBookshelf key={book.id.toString()} className="w-[250px]" book={book} removeBook={removeBookHandler} />
                    ))}
                </div>
            </div>
        </>
    )

}

export default MyBookShelf