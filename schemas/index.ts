import * as z from "zod";
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
});
