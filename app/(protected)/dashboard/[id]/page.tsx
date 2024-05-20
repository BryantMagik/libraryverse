"use client"
import { useEffect, useState } from 'react'
import { Book, statusLabels } from '@/app/types/typesModels'
import Image from 'next/image'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Separator } from '@/components/ui/separator'
import { Button } from '@nextui-org/button'

const BookDetails = () => {
    const [book, setBook] = useState<Book | null>(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const currentUrl = window.location.href
                const bookId = currentUrl.split('/').pop()

                if (bookId) {
                    const response = await fetch(`/api/books/${bookId}`)
                    if (response.ok) {
                        const bookData = await response.json()
                        setBook(bookData)
                    } else {
                        console.error('Error al obtener los detalles del libro:', response.statusText)
                    }
                } else {
                    console.error('ID del libro no encontrado en la URL')
                }
            } catch (error) {
                console.error('Error al obtener los detalles del libro:', error)
            }
        }

        fetchBook()
    }, [])
    const fechaCreacion = book && book.createdAt ? new Date(book.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const fechaActualizacion = book && book.updatedAt ? new Date(book.updatedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    return (
        <>
            {book ? (
                <div className='grid grid-cols-2 gap-1'>
                    <div className='text-center'>
                        <Image src={book.coverImage ?? '/dashboard/book-placeholder.jpg'} width="350" height="20" alt="a" className="mx-auto" />
                        <div className='flex flex-row justify-center space-x-3 mt-10'>
                            <Button className=''>Leer</Button>
                            <Button className=''>Guardar</Button>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-3xl font-semibold leading-9 text-custom-gray'>{book.title}</h1>
                        <h2 className='text-2x1 font-medium text-library-400'>{book.author?.name}</h2>
                        <div className='mt-6'>
                            <h2 className='text-2xl mb-7 font-normal'>Acerca de</h2>
                            <p>Fecha de publicación: <span className='text-library-300'>{fechaCreacion}</span></p>
                            <p>Última actualización: <span className='text-library-300'>{fechaActualizacion}</span></p>
                            <p>Género: <span className='text-library-300'>{book.genre}</span></p>
                            <p>Estado del Verse: <span className='text-library-300'>{statusLabels[book.status]}</span></p>
                        </div>
                        <Card className='mt-8'>
                            <CardHeader className="flex gap-3">
                                <h1>Descripcion</h1>
                            </CardHeader>
                            <Separator />
                            <CardBody>
                                <p className='text-justify'>{book.description}</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            ) : (
                <p>Cargando detalles del libro...</p>
            )}
        </>
    )
}

export default BookDetails
