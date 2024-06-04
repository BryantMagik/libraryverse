
import React from 'react'
import { BOOKS_IMAGE_PATH, BOOKS_IMAGE_SIZE, GBook } from '@/app/types/typesBooksAPi'
import Image from 'next/image'
import { TitlePage } from '../title-page'
import { Card, CardBody, ScrollShadow } from '@nextui-org/react'
import { Separator } from '@/components/ui/separator'

interface GbookDestailsProps {
    gbook: GBook | undefined

}
const GbookArtsDetails: React.FC<GbookDestailsProps> = ({ gbook }) => {


    if (!gbook) {
        return <div>No hay datos</div>
    }
    const imageLink = `${BOOKS_IMAGE_PATH}${gbook.id}${BOOKS_IMAGE_SIZE}`
    const imgUrl: string | undefined = (gbook.volumeInfo.imageLinks?.thumbnail ?? '/dashboard/book-placeholder.jpg') + "?fife=w480-h690"
    const categories = gbook.volumeInfo.categories?.join(', ')
    const authors = gbook.volumeInfo.authors?.join(', ')
    const publishedDate = gbook.volumeInfo.publishedDate
    const pageCount = gbook.volumeInfo.pageCount
    const language = gbook.volumeInfo.language
    const freeContet = gbook.accessInfo?.pdf?.isAvailable ? 'Si' : 'No'

    return (

        <div>
            <div className='mb-4'>
                <TitlePage title={'Detalles del Libro'} subtitle={'Descubre más sobre esta historia...'} />
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-1 grid-cols-1'>
                <div>
                    <Image src={imageLink ?? '/dashboard/book-placeholder.jpg'} alt={gbook.volumeInfo.title} width="350" height="20" className='mx-auto' />
                </div>
                <div className='md:mt-2 lg:mt-0'>
                    <h1 className='text-3xl font-semibold leading-9 text-custom-gray dark:text-emerald-500'>{gbook.volumeInfo.title}</h1>
                    <h2 className='text-2x1 font-medium text-library-400 dark:text-white'>{authors}</h2>
                    <div className='mt-6'>
                        <h2 className='text-2xl mb-7 font-normal dark:text-emerald-400'>Acerca de</h2>
                        <p>Fecha de publicación: <span className='text-library-300 dark:text-emerald-400'>{publishedDate}</span></p>
                        <p>Género:  <span className='text-library-300 dark:text-emerald-400'>{categories}</span></p>
                        <p>Páginas totales:  <span className='text-library-300 dark:text-emerald-400'>{pageCount}</span></p>
                        <p>Idioma: <span className='text-library-300 dark:text-emerald-400'>{language}</span></p>
                    </div>
                    <div className='mt-8'>
                        <h2 className='text-2xl mb-7 font-normal dark:text-emerald-400'>Descripción</h2>
                        <div dangerouslySetInnerHTML={{ __html: gbook.volumeInfo.description }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GbookArtsDetails
