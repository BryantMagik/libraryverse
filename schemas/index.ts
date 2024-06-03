import * as z from "zod"

//Validación de datos

export const SettingsSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    email: z.optional(
        z.string().email({ message: "Introduce un email válido." })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(z.string().min(6, { message: "Contraseña minimo de 6 caracteres" })),
    newPassword: z.optional(z.string().min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres." })),
})
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false;
            }

            return true;
        },
        { message: "La nueva contraseña es obligatoria cuando se proporciona una contraseña actual.", path: ["newPassword"] }
    )
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    },
        { message: "La contraseña actual es obligatoria cuando se proporciona una nueva contraseña.", path: ["password"] }
    )


// Esquema de Contraseña
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres.",
    })
})
// Esquema de reseteo
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Por favor, introduce un correo electrónico válido.",
    })
})

// Esquema de inicio de sesión
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Por favor, introduce un correo electrónico válido.",
    }),
    password: z.string().min(1, {
        message: "Por favor, introduce tu contraseña.",
    }),
    code: z.optional(z.string())
})

// Esquema de registro

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Por favor, introduce un correo electrónico válido.",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres.",
    }),
    name: z.string().min(1, {
        message: "Por favor, introduce tu nombre.",
    }),
})

//Esquema de Status

export const BookStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'PAUSED'])


export const GenreEnum = z.enum([
    'FICTION', 'NONFICTION', 'MYSTERY', 'FANTASY', 'SCIFI', 'ROMANCE', 'HORROR',
    'BIOGRAPHY', 'HISTORY', 'POETRY', 'OTHER',
    'POLITICAL_SCIENCE', 'GRIEF',
    'ADVENTURE', 'CHILDREN', 'THRILLER', 'CRIME', 'DRAMA', 'LITERARY_CRITICISM', 'FAMILY_RELATIONSHIPS',
    'COMEDY', 'ACTION', 'SELF_HELP', 'ART', 'COOKING', 'JUVENILE_NONFICTION', 'COMPUTERS', 'BIOGRAPHY_AUTOBIOGRAPHY', 'YOUNG_ADULT_FICTION'
])

// Esquema de creación de libros

export const BookSchema = z.object({
    title: z.string().min(1, {
        message: "Por favor, proporciona un título válido."
    }),
    description: z.string().min(1, {
        message: "La descripción no puede estar vacía."
    }),
    coverImage: z.string().optional(),
    genre: GenreEnum.optional(),
    // tags: z.array(z.string()).optional(),
    status: BookStatusSchema,
    authorId: z.string().min(1, {
        message: "El ID del autor es obligatorio."
    })
})
// Esquema de creación de capitulos

export const ChapterStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'PAUSED'])

export const ChapterSchema = z.object({
    title: z.string().min(1, {
        message: "Por favor, introduce un título"
    }),
    content: z.string().min(1, {}),
    order: z.string().regex(/^\d+$/, {
        message: "El orden del capítulo debe ser un número positivo"
    }),
    status: ChapterStatusSchema,
    bookId: z.string().min(1, {
        message: "El ID del libro es requerido."
    }),
    userId: z.string().min(1, {
        message: "El ID del libro es requerido."
    })

})

