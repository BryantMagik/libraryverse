"use client"

import * as React from 'react'
import { Chapter } from '@/app/types/typesModels'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { HistoryArtTable } from '@/app/(protected)/_componets/historys/historyArtTable'
import { listChapter } from '@/actions/list-chapter'
import { deleteChapter } from '@/actions/delete-chapter'
import toaster, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const MyChaptersAll: React.FC = () => {

    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
    const router = useRouter()

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

    const removeChapterHandler = async (chapterId: string) => {
        deleteChapter(chapterId, bookId)
            .then((data) => {
                if (data?.success) {
                    setChapters(prevChapters => prevChapters.filter((chapter) => chapter.id !== chapterId))
                    toaster.success('Capitulo eliminado exitosamente')
                } else {
                    toaster.error('Error al eliminar el Capitulo')
                }
            })
    }

    const editChapterHandler = async(chapter: Chapter) => {
        setSelectedChapter(chapter)
        router.push(`/edit/${chapter.id}?bookId=${bookId}`)
    }

    return (
        <>
            {chapters.map((chapter: Chapter) => (
                <HistoryArtTable
                    key={chapter.id}
                    chapter={chapter}
                    removeChapter={removeChapterHandler} 
                    editChapter={() => editChapterHandler(chapter)}
                    />
            ))}
            <Toaster />
        </>
    )
}

export default MyChaptersAll