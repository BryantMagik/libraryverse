"use client"

import { ChaptersAll } from '@/app/(protected)/_componets/historys/chapters-all'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { useBookDetails } from '@/hook/use-book-details'

const BookChaptersPage = () => {

    const book = useBookDetails()

    return (
        <div>
            <TitlePage title={`Capítulos de ${book?.title}`} subtitle={`Escrito por ${book?.author?.name}`} />
            <ChaptersAll />
        </div>
    )
}

export default BookChaptersPage
