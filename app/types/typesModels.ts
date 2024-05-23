import { $Enums, Genre } from "@prisma/client";

export enum BookStatus {
  DRAFT = "en emisión",
  PUBLISHED = "Terminado",
  PAUSED = "Pausado"
}

export const GenreEnumESP = {
  FICTION: 'Ficción',
  NONFICTION: 'No ficción',
  MYSTERY: 'Misterio',
  FANTASY: 'Fantasía',
  SCIFI: 'Ciencia ficción',
  ROMANCE: 'Romance',
  HORROR: 'Terror',
  BIOGRAPHY: 'Biografía',
  HISTORY: 'Historia',
  POETRY: 'Poesía',
  OTHER: 'Otro',
  ADVENTURE: 'Aventura',
  CHILDREN: 'Infantil',
  THRILLER: 'Suspenso',
  CRIME: 'Crimen',
  DRAMA: 'Drama',
  COMEDY: 'Comedia',
  ACTION: 'Acción',
  SELF_HELP: 'Autoayuda',
  ART: 'Arte',
  COOKING: 'Cocina',
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

export interface Chapter {
  id: string
  title: string
  content: string
  bookId: string
  createdAt: Date
  updatedAt: Date

}