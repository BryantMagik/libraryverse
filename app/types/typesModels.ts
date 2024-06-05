import { $Enums, Genre } from "@prisma/client"

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
  JUVENILE_NONFICTION: 'No ficción juvenil',
  POLITICAL_SCIENCE: 'Ciencias políticas',
  GRIEF: 'Duelo',
  LITERARY_CRITICISM: 'Crítica literaria',
  FAMILY_RELATIONSHIPS: 'Familia y relaciones',
  COMPUTERS: 'Computación',
  BIOGRAPHY_AUTOBIOGRAPHY: 'Biografía y autobiografía',
  YOUNG_ADULT_FICTION: 'Ficción para jóvenes adultos'
}

export const GenderEnumESP = {
  MALE: 'Hombre',
  FEMALE: 'Mujer',
}


export const statusLabels = {
  DRAFT: "Borrador",
  PUBLISHED: "Publicado",
  PAUSED: "Pausado",
}

export type User = {
  id: string
  name: string | null
  lastname: string | null
  nickname: string | null
  dateOfBirth: string | null
  country: $Enums.Country | null
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
  author: Partial<User> | null
}

export interface Chapter {
  book: any
  id: string
  title: string
  content: string
  bookId: string
  createdAt: Date
  updatedAt: Date
  order: string
  status: $Enums.ChapterStatus
}