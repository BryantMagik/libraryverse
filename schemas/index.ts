import * as z from "zod"

//Validación de datos

export const CountryEnum = z.enum([
    'ARGENTINA', 'BOLIVIA', 'CHILE', 'COLOMBIA', 'COSTA_RICA', 'CUBA', 'ECUADOR', 'EL_SALVADOR', 'SPAIN', 'GUATEMALA', 'HONDURAS', 'MEXICO', 'NICARAGUA', 'PANAMA', 'PARAGUAY', 'PERU', 'PUERTO_RICO', 'DOMINICAN_REPUBLIC', 'URUGUAY', 'VENEZUELA', 'UNITED_STATES', 'CANADA', 'UNITED_KINGDOM', 'AUSTRALIA', 'FRANCE', 'GERMANY', 'ITALY', 'JAPAN', 'CHINA', 'INDIA', 'BRAZIL', 'RUSSIA', 'SOUTH_AFRICA'
])
export const BookStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'PAUSED'])

export const GenreEnum = z.enum([
    'FICTION', 'NONFICTION', 'MYSTERY', 'FANTASY', 'SCIFI', 'ROMANCE', 'HORROR',
    'BIOGRAPHY', 'HISTORY', 'POETRY', 'OTHER',
    'POLITICAL_SCIENCE', 'GRIEF',
    'ADVENTURE', 'CHILDREN', 'THRILLER', 'CRIME', 'DRAMA', 'LITERARY_CRITICISM', 'FAMILY_RELATIONSHIPS',
    'COMEDY', 'ACTION', 'SELF_HELP', 'ART', 'COOKING', 'JUVENILE_NONFICTION', 'COMPUTERS', 'BIOGRAPHY_AUTOBIOGRAPHY', 'YOUNG_ADULT_FICTION'
])

export const SettingsSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    email: z.optional(
        z.string().email({ message: "Introduce un email válido." })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    lastName: z.string().min(1, {
        message: "Por favor, introduce tu apellido."
    }),

    nickName: z.string()
        .min(1, {
            message: "Por favor, introduce tu nombre de usuario."
        })
        .max(20, {
            message: "El nombre de usuario no puede tener más de 20 caracteres."
        }),
    dateOfBirth: z.string()
        .min(1, {
            message: "Por favor, introduce tu fecha de nacimiento."
        }),
    country: CountryEnum.optional(),
    password: z.optional(z.string().min(6, { message: "Contraseña minimo de 6 caracteres" })),
    newPassword: z.optional(z.string().min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres." })),
})
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false
            }

            return true
        },
        { message: "La nueva contraseña es obligatoria cuando se proporciona una contraseña actual.", path: ["newPassword"] }
    )
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false
        }

        return true
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
    email: z.string()
        .email({
            message: "Por favor, introduce un correo electrónico válido."
        }),

    password: z.string()
        .min(6, {
            message: "La contraseña debe tener al menos 6 caracteres."
        }),

    name: z.string()
        .min(1, {
            message: "Por favor, introduce tu nombre."
        })
        .max(30,
            { message: "El nombre no puede tener más de 30 caracteres." }),
    lastName: z.string()
        .min(1,
            { message: "Por favor, introduce tu apellido." })
        .max(100,
            { message: "El apellido no puede tener más de 30 caracteres." }),

    nickName: z.string()
        .min(1, {
            message: "Por favor, introduce tu nombre de usuario."
        })
        .max(20, {
            message: "El nombre de usuario no puede tener más de 20 caracteres."
        }),
    dateOfBirth: z.string()
        .min(1, {
            message: "Por favor, introduce tu fecha de nacimiento."
        }),

    country: CountryEnum.optional(),
})

//Esquema de Status


// Esquema de creación de libros

export const BookSchema = z.object({
    title: z.string()
        .min(1, { message: "Por favor, proporciona un título válido." })
        .max(255, {
            message: "El título no puede exceder los 255 caracteres."
        }),
    description: z.string()
        .min(1, { message: "La descripción no puede estar vacía." })
        .max(5000, {
            message: "La descripción no puede exceder los 5000 caracteres."
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
    title: z.string()
        .min(1, {
            message: "Por favor, introduce un título"
        })
        .max(255, {
            message: "El título no puede exceder los 255 caracteres."
        }),
    content: z.string().min(1, {
        message: "Por favor, introduce el contenido del capítulo."
    })
        .max(20000, {
            message: "El contenido no puede exceder los 20000 caracteres."
        }),
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

