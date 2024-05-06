import { UserRole } from "@prisma/client";
import * as z from "zod";

//Validación de datos

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(
        z.string().email({ message: "Introduce el email correcto" })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false;
            }

            return true;
        },
        { message: "Es requerida una nueva contraseña", path: ["newPassword"] }
    )
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    },
        { message: "Password is required!", path: ["password"] }
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
const BookStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'PAUSED']);

// Esquema de creación de libros
export const BookSchema = z.object({
    title: z.string().min(1, {
        message: "Por favor, introduce un título."
    }),
    description: z.string().min(1, {
        message: "La descripción no puede estar vacía."
    }),
    coverImage: z.string().url().optional(), //URL
    genre: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: BookStatusSchema, 
    createdAt: z.date().optional(), // These dates are set by the system, so they are optional in the schema
    updatedAt: z.date().optional(),
    authorId: z.string().uuid().optional(),
})
