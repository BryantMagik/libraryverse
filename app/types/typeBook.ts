export enum BookStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    PAUSED = "PAUSED"
  }

  export interface Book {
    id: string
    title: string
    description: string
    coverImage: string | null
    genre: string | null
    tags: string[]
    viewCount: number
    likeCount: number
    commentCount: number
    authorId: string | null
    author?: string
}
