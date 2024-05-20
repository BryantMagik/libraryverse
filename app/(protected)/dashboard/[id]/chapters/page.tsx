"use client"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation' // Importa useSearchParams
import { Chapter } from '@/app/types/typesModels'

const BookChaptersPage = () => {
    const [chapters, setChapters] = useState<Chapter[]>([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        const fetchChapters = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/books/${id}/chapters`)
                    if (response.ok) {
                        const chaptersData = await response.json()
                        setChapters(chaptersData)
                    } else {
                        console.error('Error al obtener los capítulos del libro:', response.statusText)
                    }
                } catch (error) {
                    console.error('Error al obtener los capítulos del libro:', error)
                }
            }
        }

        fetchChapters()
    }, [id])

    return (
        <div>
            <h1>Capítulos del libro</h1>
            {chapters.length > 0 ? (
                <ul>
                    {chapters.map(chapter => (
                        <li key={chapter.id}>{chapter.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Cargando capítulos...</p>
            )}
        </div>
    )
}

export default BookChaptersPage
