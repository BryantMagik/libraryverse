"use server"; // Cambiado de "use server" a "use strict" para la declaración de modo estricto

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {

    if (!token) {
        return { error: "No existe el token" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "La contraseña no valida" }
    }


    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Token no valido!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return { error: "El token ha expirado" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "Emai no existe" }
    }

    // HASH NEW PASSWORD
    const { password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    })

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Contraseña Cambiada!" }
};
