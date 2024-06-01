"use client"

import { useRouter, useParams } from 'next/navigation'

import BookDetailsComponent from '@/app/(protected)/_componets/books/bookdetails'

const BookDetailsPage = () => {

    const router = useRouter()
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id
    
    const handleViewChapters = () => {
        router.push(`/book/${bookId}/chapters`)
    }

    return (
        <>
            <BookDetailsComponent handleViewChapters={handleViewChapters} />
        </>
    )
}

export default BookDetailsPage
