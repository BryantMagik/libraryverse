
import React from 'react'
import { BOOKS_IMAGE_PATH, BOOKS_IMAGE_SIZE, GBook } from '@/app/types/typesBooksAPi'
import Image from 'next/image'
import { TitlePage } from '../title-page'

interface GbookDestailsProps {
    gbook: GBook | undefined

}
const GbookArtsDetails: React.FC<GbookDestailsProps> = ({ gbook }) => {


    if (!gbook) {
        return <div>No hay datos</div>
    }
    const imageLink = `${BOOKS_IMAGE_PATH}${gbook.id}${BOOKS_IMAGE_SIZE}`
    const imgUrl: string | undefined = (gbook.volumeInfo.imageLinks?.thumbnail ?? '/dashboard/book-placeholder.jpg') + "?fife=w480-h690"

    return (

        <div>
            <TitlePage  title={'Detalles del Libro'} subtitle={'Descubre más sobre esta historia...'} />
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-1 grid-cols-1'>
                <div>
                    <Image src={imageLink ?? '/dashboard/book-placeholder.jpg'} alt={gbook.volumeInfo.title} width="350" height="20" className='mx-auto' />
                </div>
                <div className='md:mt-2 lg:mt-0'>
                    <h1 className='text-3xl font-semibold leading-9 text-custom-gray dark:text-emerald-500'>{gbook.volumeInfo.title}</h1>
                    <h2 className='text-2x1 font-medium text-library-400 dark:text-white'>{gbook.volumeInfo.authors}</h2>
                    
                    <div className='mt-6'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GbookArtsDetails