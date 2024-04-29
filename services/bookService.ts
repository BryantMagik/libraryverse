import { BooksApiResponse } from "@/app/types/typeBook"

export const fetchBooks = async (query: string, apiKey: string): Promise<BooksApiResponse | null> => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`)
        if (!response.ok) {
            throw new Error("Network error")
        }
        const data: BooksApiResponse = await response.json()
        return data
    } catch (error) {
        console.log("Error fetch de datos Books", error)
        return null;
    }

}