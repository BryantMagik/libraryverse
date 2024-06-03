"use client"

import { startTransition, useEffect, useState } from 'react'
import { Chapter } from '@/app/types/typesModels'
import { useParams } from 'next/navigation'
import { ChapterContent } from '@/app/(protected)/_componets/historys/chapter-content'
import { TitlePage } from '../title-page'
import { getChapter } from '@/actions/get-chapter'

const ByChapter = () => {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id, bookId } = useParams()
    
    useEffect(() => {
        if (id) {
            startTransition(() => {
                const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId
                const idChapterString = Array.isArray(id) ? id[0] : id

                getChapter(bookIdString, idChapterString,)
                    .then((fetchedChapters) => {
                        //@ts-ignore
                        setChapters(fetchedChapters)
                        console.log(fetchedChapters)

                    }).catch(error => {
                        console.error("Error en server actions de listChapter:", error)
                    })
            })
        }
    }, [id])

    return (
        <div>
            {chapters.length > 0 ? (
                <>
                    {chapters.map(chapter => (
                        <div key={chapter.id}>
                            <TitlePage title={`Estas leyendo ${chapter?.book?.title}`} subtitle={`Escrito por ${chapter?.book?.author.name}`} />
                            <h1 className='text-center italic text-2xl'>Capitulo: {chapter.order} {chapter.title}</h1>
                            <ChapterContent content={chapter.content} />
                        </div>
                    ))}
                </>
            ) : (
                <p>No hay capitulos disponibles </p>
            )}
        </div>
    )
}

export default ByChapter