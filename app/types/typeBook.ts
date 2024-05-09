import { $Enums, User } from "@prisma/client";

export enum BookStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    PAUSED = "PAUSED"
  }

  export interface Book {
    id: string;
    title: string;
    description: string;
    coverImage: string | null;
    genre: string | null;
    tags: string[];
    status: $Enums.BookStatus;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author: User;
}
