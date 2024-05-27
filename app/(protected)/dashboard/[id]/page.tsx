"use client"

import { useEffect, useState } from 'react'
import { Book, GenreEnumESP, statusLabels } from '@/app/types/typesModels'
import Image from 'next/image'
import { Card, CardBody } from "@nextui-org/card"
import { Separator } from '@/components/ui/separator'
import { Button } from '@nextui-org/button'
import { useRouter, useParams } from 'next/navigation'
import { ScrollShadow } from "@nextui-org/scroll-shadow"
import { bookDetails } from '@/actions/book-details'

const BookDetails = () => {

    const [book, setBook] = useState<Book | null>(null)
    const router = useRouter()
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id


    useEffect(() => {
        if (id) {
            bookDetails(bookId)
                .then((fetchBook) => {
                    if (fetchBook !== null) {
                        setBook(fetchBook)
                    } else {
                        console.error("El libro no fue encontrado");
                    }
                }).catch(error => {
                    console.error("Error en server actions bookdetails:", error)
                })
        }
    }, [id])

    const handleViewChapters = () => {
        if (book) {
            router.push(`/dashboard/${bookId}/chapters`)
        }
    }

    const fechaCreacion = book && book.createdAt ? new Date(book.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const fechaActualizacion = book && book.updatedAt ? new Date(book.updatedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    return (
        <>
            {book ? (
                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-1 grid-cols-1'>
                    <div className='text-center'>
                        <Image src={book.coverImage ?? '/dashboard/book-placeholder.jpg'} width="350" height="20" alt="a" className="mx-auto" />
                        <div className='flex flex-row justify-center space-x-3 mt-10'>
                            <Button className='' onClick={handleViewChapters}>Leer</Button>
                            <Button className=''>Agregar al Bookshelf</Button>
                        </div>
                    </div>
                    <div className='md:mt-2 lg:mt-0'>
                        <h1 className='text-3xl font-semibold leading-9 text-custom-gray'>{book.title}</h1>
                        <h2 className='text-2x1 font-medium text-library-400'>{book.author?.name}</h2>
                        <div className='mt-6'>
                            <h2 className='text-2xl mb-7 font-normal'>Acerca de</h2>
                            <p>Fecha de publicación: <span className='text-library-300'>{fechaCreacion}</span></p>
                            <p>Última actualización: <span className='text-library-300'>{fechaActualizacion}</span></p>
                            <p>Género: <span className='text-library-300'>{book.genre ? GenreEnumESP[book.genre] : ''}</span></p>
                            <p>Estado del Verse: <span className='text-library-300'>{statusLabels[book.status]}</span></p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='text-2xl mb-7 font-normal'>Descripción</h2>
                            <ScrollShadow className="md:w-[500px] md:h-[200px] w-[350px] h-[200px]">
                                <Card className="">
                                    <Separator />
                                    <CardBody>
                                        <p className='text-justify'>{book.description}</p>
                                    </CardBody>
                                </Card>
                            </ScrollShadow>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando detalles del libro...</p>
            )}
        </>
    )
}

export default BookDetails
