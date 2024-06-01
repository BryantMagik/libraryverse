"use client"

import { startTransition, useEffect, useState } from 'react'
import { Book, Chapter } from '@/app/types/typesModels'
import { useParams } from 'next/navigation'
import { listChapter } from '@/actions/list-chapter'
import { ChapterContent } from '@/app/(protected)/_componets/historys/chapter-content'
import { TitlePage } from '../title-page'

const ByChapter = () => {
    
    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id, bookId } = useParams()


    useEffect(() => {
        if (id) {
            startTransition(() => {
                const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId
                listChapter(bookIdString)
                    .then((fetchedChapters) => {
                         //@ts-ignore
                        setChapters(fetchedChapters)

                    }).catch(error => {
                        console.error("Error en server actions de listChapter:", error)
                    })
            })
        }
    }, [id])

    console.log("Chapters:", chapters)

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
                <p>Cargando capítulos...</p>
            )}
        </div>
    )
}

export default ByChapter