"use client"

import { startTransition, useEffect, useState } from 'react'
import { Chapter } from '@/app/types/typesModels'
import { useParams } from 'next/navigation'
import { ChapterContent } from '@/app/(protected)/_componets/historys/chapter-content'
import { TitlePage } from '../title-page'
import { getChapter } from '@/actions/get-chapter'
import { DropdownMenuChapters } from './dropdowBookList'
import { useRouter } from 'next/navigation'
import { useBookDetails } from '@/hook/use-book-details'
import { getStatusChapter } from '@/actions/getStatusChapter'
import { ChapterUserStatus } from '@prisma/client'
import { GrFormNextLink } from "react-icons/gr"
import { Loading } from '../loading/loading'
import { Button } from '@/components/ui/button'


const ByChapter = () => {

    const [chapter, setChapter] = useState<Chapter[]>([])
    const [readStatus, setReadStatus] = useState<ChapterUserStatus | null>(null)

    const { bookId, chapterId } = useParams()
    const normalizedChapterId = Array.isArray(chapterId) ? chapterId[0] : chapterId
    const normalizedbookId = Array.isArray(bookId) ? bookId[0] : bookId

    const router = useRouter()

    useEffect(() => {
        if (chapterId) {
            startTransition(() => {
                const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId
                const idChapterString = Array.isArray(chapterId) ? chapterId[0] : chapterId
                getChapter(idChapterString)
                    .then((fetchedChapter) => {
                        //@ts-ignore
                        setChapter(fetchedChapter)
                        return getStatusChapter(idChapterString)

                    }).catch(error => {
                        console.error("Error en server actions de listChapter:", error)
                    })
                getStatusChapter(normalizedChapterId)
                    .then((status) => {
                        setReadStatus(status)
                    }).catch(error => {
                        console.error("Error en server actions de getStatusChapter:", error)
                    })
            })
        }

    }, [chapterId])

    const bookDetails = useBookDetails()

    if (!bookDetails) {
        <Loading label='Cargando contenido del libro' />
    }

    return (
        <div>
            {chapter.length > 0 ? (
                <>
                    {chapter.map(chapter => (
                        <div key={chapter.id}>
                            <div key={chapter.id} className='pb-10'>
                                <TitlePage title={`Estas leyendo ${chapter?.book?.title}`} subtitle={`Escrito por ${chapter?.book?.author.name}`} />

                                <h1 className='text-center italic text-2xl pb-5'>Capitulo: {chapter.order} {chapter.title}</h1>

                                <ChapterContent content={chapter.content} />
                            </div>
                            <div className='grid grid-cols-1  place-content-center'>
                                {bookDetails &&
                                    <>
                                        <div className='mx-auto place-content-center'>
                                            <DropdownMenuChapters chapterId={chapter.id} book={bookDetails} />
                                        </div>

                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <Loading label='Cargando contenido del capitulo' />
            )
            }
        </div >
    )
}

export default ByChapter