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

export const ChaptersAll: React.FC = () => {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id
    
    const router = useRouter()

    useEffect(() => {
        listChapter(bookId)
            .then((fetchedChapters) => {
                //@ts-ignore
                setChapters(fetchedChapters)
            }).catch(error => {
                console.error("Error en server actions de listChapter:", error)
            })
    }, [bookId])

    const readChapter = (chapterId: string) => {
        router.push(`/chapters/${chapterId}?bookId=${bookId}`)
    }
    const handleUpdateChapterStatus = async (chapterId: string, status: ChapterUserStatus) => {

        updateChapterStatus(chapterId, status)
            .then(() => {
                toast.success('Has leido este capítulo')
            }).catch(error => {
            })
    }

    return (
        <>
            {chapters.map((chapter: Chapter) => (
                <HistoryArtTableAll key={chapter.id} chapter={chapter}  readChapter={readChapter} updateChapterStatus={handleUpdateChapterStatus}  />
            ))}
        </>

    )

}