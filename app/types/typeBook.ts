export interface Book {
    id: string
    volumeInfo: {
        title: string
        authors: string[]
        publishedDate: string
        description: string
        imageLinks?: {
            thumbnail: string
        }
    }
}

export interface BooksApiResponse {
    items?: Book[]
    error?: string
}
