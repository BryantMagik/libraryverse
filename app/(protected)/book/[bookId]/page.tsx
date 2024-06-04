"use client"

import { useRouter, useParams } from 'next/navigation'

import BookDetailsComponent from '@/app/(protected)/_componets/books/bookdetails'

const BookDetailsPage = () => {

    const router = useRouter()
    const { bookId } = useParams()
    const normalizedBookId = Array.isArray(bookId) ? bookId[0] : bookId

    console.log("BookId:", normalizedBookId)

    const handleViewChapters = () => {
        router.push(`/book/${normalizedBookId}/chapters/`)
    }

    return (
        <>
            <BookDetailsComponent handleViewChapters={handleViewChapters} />
        </>
    )
}

export default BookDetailsPage
