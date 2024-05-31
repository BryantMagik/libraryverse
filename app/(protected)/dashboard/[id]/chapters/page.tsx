"use client"

import { startTransition, useEffect, useState } from 'react'
import { Chapter } from '@/app/types/typesModels'
import { useParams } from 'next/navigation'
import { listChapter } from '@/actions/list-chapter'

const BookChaptersPage = () => {
    const [chapters, setChapters] = useState<Chapter[]>([])
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        if (id) {
            startTransition(() => {
                listChapter(bookId)
                    .then((fetchedChapters) => {
                        setChapters(fetchedChapters)
                    }).catch(error => {
                        console.error("Error en server actions de listChapter:", error)
                    })
            })
        }
    }, [id])

    return (
        <div>
            <h1>Capítulos del libro</h1>
            {chapters.length > 0 ? (
                <ul>
                    {chapters.map(chapter => (
                        <>
                            <li key={chapter.id}>{chapter.title}</li>
                            <p>{String(chapter.content)}</p> // Convert chapter.content to a string
                        </>
                    ))}
                </ul>
            ) : (
                <p>Cargando capítulos...</p>
            )}
        </div>
    )
}

export default BookChaptersPage
