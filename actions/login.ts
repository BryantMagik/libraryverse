"use server"

import * as z from "zod"

import { signIn } from "@/auth"

import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { generateVerificationToken } from "@/lib/tokens"
import { AuthError } from "next-auth"

import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    // Validar los campos recibidos
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Campos inválidos" }
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email) {
        return { error: "El correo electrónico no existe" }
    }

    if (!existingUser.password) {
        return { error: "This email already Exists. Check in with Google or GitHub" }
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)

    if (!matchPassword) {
        return { error: "Wrong password, Please enter the correct password" };
    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,)

        return { success: "¡Se ha enviado un correo de confirmación! Por favor, verifique su correo electrónico para activar su cuenta." }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return { success: "Login successful" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales incorrectas" }
                default:
                    return { error: "Algo salió mal" }
            }
        }
        throw error
    }

}
