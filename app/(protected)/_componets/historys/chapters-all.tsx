"use client"

import * as React from 'react'
import { Chapter } from '@/app/types/typesModels'
import { listChapter } from '@/actions/list-chapter'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { HistoryArtTableAll } from './historyArtTableAll'

export const ChaptersAll: React.FC = () => {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id
    
    const router = useRouter()

    useEffect(() => {
        listChapter(bookId)
            .then((fetchedChapters) => {
                console.log("Fetched Chapters:", fetchedChapters)
                setChapters(fetchedChapters)
            }).catch(error => {
                console.error("Error en server actions de listChapter:", error)
            })
    }, [bookId])

    console.log("Chapters:", chapters)

    const readChapter = (chapterId: string) => {
        router.push(`/chapters/${chapterId}?bookId=${bookId}`)
    }

    return (
        <>
            {chapters.map((chapter: Chapter) => (
                <HistoryArtTableAll key={chapter.id} chapter={chapter}  readChapter={readChapter}/>
            ))}
        </>

    )

}