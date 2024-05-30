
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from "@nextui-org/card"
import { Separator } from '@/components/ui/separator'
import { ScrollShadow } from "@nextui-org/scroll-shadow"
import Image from 'next/image';
import { Book, GenreEnumESP, statusLabels } from '@/app/types/typesModels'
import { addBookShelf } from '@/actions/add-bookshelf'
import { useCurrentUser } from "@/hook/use-current-user"
import { useParams } from 'next/navigation'
import { bookDetails } from '@/actions/book-details'

interface BookDetailsProps {
    handleViewChapters: () => void
}

const BookDetailsComponent: React.FC<BookDetailsProps> = ({ handleViewChapters }) => {
    const [book, setBook] = useState<Book | null>(null)
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id
    const user = useCurrentUser()
    const fechaCreacion = book && book.createdAt ? new Date(book.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
    const fechaActualizacion = book && book.updatedAt ? new Date(book.updatedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

    useEffect(() => {
        if (id) {
            bookDetails(bookId)
                .then((fetchBook) => {
                    if (fetchBook !== null) {
                        setBook(fetchBook)
                    } else {
                        console.error("El libro no fue encontrado")
                    }
                }).catch(error => {
                    console.error("Error en server actions bookdetails:", error)
                })
        }
    }, [id])

    const addBookshelf = async () => {

        if (book) {
            try {
                if (user.session?.id) {
                    addBookShelf(bookId, user.session?.id)
                        .then((data) => {
                            if (data?.success) {
                                toast.success('Libro agregado exitosamente')
                            }
                            if (data?.error) {
                                toast.error('Este libro ya ha sido agregado al bookshelf')
                            }
                        })
                }
            } catch (error) {
                console.log("error al agregar libro al bookshelf")
            }
        }
    }

    return (
        <>
            {book ? (
                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-1 grid-cols-1'>
                    <div className='text-center'>
                        <Image src={book.coverImage ?? '/dashboard/book-placeholder.jpg'} width="350" height="20" alt="a" className="mx-auto" />
                        <div className='flex flex-row justify-center space-x-3 mt-10'>
                            <Button className='dark:bg-emerald-700 dark:hover:bg-emerald-400' onClick={handleViewChapters}>Leer</Button>
                            <Button className='dark:bg-emerald-700 dark:hover:bg-emerald-400' onClick={addBookshelf} >Agregar al Bookshelf</Button>
                        </div>
                    </div>
                    <div className='md:mt-2 lg:mt-0'>
                        <h1 className='text-3xl font-semibold leading-9 text-custom-gray dark:text-emerald-500'>{book.title}</h1>
                        <h2 className='text-2x1 font-medium text-library-400 dark:text-white'>{book.author?.name}</h2>
                        <div className='mt-6'>
                            <h2 className='text-2xl mb-7 font-normal dark:text-emerald-400'>Acerca de</h2>
                            <p>Fecha de publicación: <span className='text-library-300 dark:text-emerald-400'>{fechaCreacion}</span></p>
                            <p>Última actualización: <span className='text-library-300 dark:text-emerald-400'>{fechaActualizacion}</span></p>
                            <p>Género: <span className='text-library-300 dark:text-emerald-400'>{book.genre ? GenreEnumESP[book.genre] : ''}</span></p>
                            <p>Estado del Verse: <span className='text-library-300 dark:text-emerald-400'>{statusLabels[book.status]}</span></p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='text-2xl mb-7 font-normal dark:text-emerald-400'>Descripción</h2>
                            <ScrollShadow className="md:w-[500px] md:h-[200px] w-[350px] h-[200px] scrollbar-hide">
                                <Card className="">
                                    <Separator />
                                    <CardBody>
                                        <p className='text-justify'>{book.description}</p>
                                    </CardBody>
                                </Card>
                            </ScrollShadow>
                            <Toaster />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando detalles del libro...</p>
            )}
        </>
    )
}

export default BookDetailsComponent
