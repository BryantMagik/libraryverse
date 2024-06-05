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
import { updateChapterStatus } from '@/actions/user-chapter-status'
import { Spinner, Switch } from '@nextui-org/react'


const ByChapter = () => {

    const [chapter, setChapter] = useState<Chapter[]>([])
    const [readStatus, setReadStatus] = useState<ChapterUserStatus | null>(null)

    const { bookId, chapterId } = useParams()
    const normalizedChapterId = Array.isArray(chapterId) ? chapterId[0] : chapterId

    console.log("Capitulo id:", chapterId)
    console.log("bookId:", bookId)
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
        return <div className="flex items-center justify-center h-screen"><Spinner size="lg" color='success' /> </div>
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
                            <div>
                                <DropdownMenuChapters chapterId={chapter.id} book={bookDetails} />
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className="flex items-center justify-center h-screen"><Spinner size="lg" color='danger' /> </div>
            )
            }
        </div >
    )
}

export default ByChapter