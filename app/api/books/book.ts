import type { NextApiRequest, NextApiResponse } from "next"
import { BooksApiResponse } from "@/app/types/typeBook"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BooksApiResponse>
) {
    const query = req.query.q as string
    if (!query) {
        res.status(400).json({ error: 'Query parameter "q" is required' })
        return
    }
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data: BooksApiResponse = await response.json()
        res.status(200).json(data)

    } catch (error) {
        console.error("Error fetching books:", error)
        res.status(500).json({ error: 'Failed to fetch books' })
    }
}