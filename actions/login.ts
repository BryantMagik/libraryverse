"use server"

import * as z from "zod"

import { signIn } from "@/auth"
import { db } from "@/lib/db"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import { AuthError } from "next-auth"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail, sendTwoFactortTokenEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    // Validar los campos recibidos
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Por favor, revisa los campos marcados como inválidos." }
    }

    const { email, password, code } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email) {
        return { error: "El correo electrónico no existe" }
    }

    if (!existingUser.password) {
        return { error: "Esta dirección de correo electrónico ya existe. Inicia sesión con Google o GitHub si es tu cuenta." }
    }


    const matchPassword = await bcrypt.compare(password, existingUser.password)

    if (!matchPassword) {
        return { error: "Contraseña incorrecta. Por favor, verifica y vuelve a intentarlo." };
    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,)

        return { success: "¡Se ha enviado un correo de confirmación! Por favor, verifique su correo electrónico para activar su cuenta." }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if (!twoFactorToken) {
                return { error: "Código no válido" };
            }

            if (twoFactorToken.token !== code) {
                return { error: "Código incorrecto" };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return { error: "El código ha expirado" };
            }
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            })

            const existingConfirmatiion = await getTwoFactorConfirmationByUserId(existingUser.email)

            if (existingConfirmatiion) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmatiion.id }
                })
            }
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })


        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactortTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            )
            return { twoFactor: true }
        }
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
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
