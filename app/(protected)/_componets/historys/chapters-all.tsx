"use client"

import * as React from 'react'
import { Chapter } from '@/app/types/typesModels'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { HistoryArtTableAll } from './historyArtTableAll'
import { listChapter } from '@/actions/list-chapter'
import { ChapterUserStatus } from '@prisma/client'
import { updateChapterStatus } from '@/actions/user-chapter-status'
import toast from 'react-hot-toast'
import { Spinner } from '@nextui-org/react'

export const ChaptersAll: React.FC = () => {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const [loading, setLoading] = useState(true)
    const { bookId, chapterId } = useParams()
    const normalizedBookId = Array.isArray(bookId) ? bookId[0] : bookId
    const normalizedChapterId = Array.isArray(chapterId) ? chapterId[0] : chapterId

    console.log("IdLibro:", normalizedBookId)
    const router = useRouter()

    useEffect(() => {
        listChapter(normalizedBookId)
            .then((fetchedChapters) => {
                //@ts-ignore
                setChapters(fetchedChapters)
                setLoading(false)
            }).catch(error => {
                console.error("Error en server actions de listChapter:", error)
                setLoading(false)
            })
    }, [bookId])

    const readChapter = (chapterId: string) => {
        router.push(`/book/${normalizedBookId}/chapters/${chapterId}`)
    }
    const handleUpdateChapterStatus = async (chapterId: string, status: ChapterUserStatus) => {

        updateChapterStatus(chapterId, status)
            .then(() => {
                toast.success('Capitulo actualizado')
                setLoading(false)
            })
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><Spinner size="lg" color='success' /> </div>
    }


    return (
        <>
            {chapters.map((chapter: Chapter) => (
                <HistoryArtTableAll key={chapter.id} chapter={chapter} readChapter={readChapter} updateChapterStatus={handleUpdateChapterStatus} />
            ))}
        </>
    )
}