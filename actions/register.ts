"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { RegisterSchema } from "@/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Datos incorrectos" }
    }

    const { email,name, password, lastName, nickName,  dateOfBirth,country } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email actualmente esta siendo usado por otro usuario" }
    }


    await db.user.create({
        data: {
            name,
            lastName,
            nickName,
            dateOfBirth,
            country,
            email,
            password: hashedPassword,
        },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        success: "¡Hecho! Correo de confirmación enviado. Revise su bandeja de entrada para activar su cuenta."
    }
}