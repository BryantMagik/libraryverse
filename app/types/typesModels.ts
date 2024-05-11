import { $Enums } from "@prisma/client";

export enum BookStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  PAUSED = "PAUSED"
}
export type User = {
  id: string;
  name: string | null
  email: string;
  image: string | null
  emailVerified: Date | null
  password: string | null
  role: string
  createdAt: Date
  isTwoFactorEnabled: boolean
};


export interface Book {
  id: string
  title: string
  description: string
  coverImage: string | null
  genre: string | null
  tags: string[]
  status: $Enums.BookStatus
  viewCount: number
  likeCount: number
  commentCount: number
  createdAt: Date
  updatedAt: Date
  author: Partial<User> | null;
  subtitle: string
}
