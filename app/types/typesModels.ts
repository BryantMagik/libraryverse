import { $Enums, Genre } from "@prisma/client";

export enum BookStatus {
  DRAFT = "en emisión",
  PUBLISHED = "Terminado",
  PAUSED = "Pausado"
}

export const statusLabels = {
  DRAFT: "Continúa",
  PUBLISHED: "Completa",
  PAUSED: "Pausado",
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
}


export interface Book {
  id: string
  title: string
  description: string
  coverImage: string | null
  genre: Genre | null
  tags: string[]
  status: $Enums.BookStatus
  createdAt: Date
  updatedAt: Date
  author: Partial<User> | null;
}
