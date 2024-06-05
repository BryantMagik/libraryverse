"use client"

import { Chapter } from "@/app/types/typesModels"
import { UpdateChapterForm } from "../../_componets/historys/edit-chapter-form"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import { getOneChapter } from "@/actions/getOneChapter"

const EditChapterPage = () => {

    const [chapter, setChapters] = useState<Chapter | null>(null)
    const { id, bookId } = useParams()
    const [chapterId, setChapterId] = useState<string | null>(null)
    const [bookIdfetch, setBookId] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId
            const idChapterString = Array.isArray(id) ? id[0] : id

            setChapterId(idChapterString)
            setBookId(bookIdString)

            getOneChapter(bookIdString, idChapterString)
                .then((fetchchapter) => {
                    //@ts-ignore
                    setChapters(fetchchapter)

                }).catch(error => {
                    console.error("Error en server actions de listChapter:", error)
                })
        }
        

    }, [id])

    if (!chapter || !chapterId) {
        return <div>Cargando...</div>
    }
    
    return (
        <>
            <UpdateChapterForm chapter={chapter} chapterId={chapterId || ''} />

        </>
    )
}

export default EditChapterPage