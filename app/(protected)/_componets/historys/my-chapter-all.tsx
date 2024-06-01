"use client"

import * as React from 'react'
import { Chapter } from '@/app/types/typesModels'
import { listChapter } from '@/actions/list-chapter'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { HistoryArtTable } from '@/app/(protected)/_componets/historys/historyArtTable'


const MyChaptersAll: React.FC = () => {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id

    useEffect(() => {    
        listChapter(bookId)
            .then((fetchedChapters) => {
                console.log("Fetched Chapters:", fetchedChapters)
                //@ts-ignore
                setChapters(fetchedChapters)
            }).catch(error => {
                console.error("Error en server actions de listChapter:", error)
            })
    }, [bookId])

    return (
        <>
            {chapters.map((chapter: Chapter) => (
                <HistoryArtTable key={chapter.id} chapter={chapter} />
            ))}
        </>
    )
}

export default MyChaptersAll