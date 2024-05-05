"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { unstable_update } from "@/auth";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const validatedValues = SettingsSchema.safeParse(values);

    if (!validatedValues.success) {
        return { error: "no valido" }
    }

    const user = await currentUser() //serverUser

    if (!user) {
        return { error: "  " }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Usuario no ha iniciado sesión" }
    }

    if (user.isOAuth) {
        validatedValues.data.email = undefined;
        validatedValues.data.password = undefined;
        validatedValues.data.newPassword = undefined;
        validatedValues.data.isTwoFactorEnabled = undefined;

        return
    }

    if (validatedValues.data.email === undefined) {
        return { info: "  " };
    }

    const existingUser = await getUserByEmail(validatedValues.data.email)

    if (validatedValues.data.email && validatedValues.data.email !== user.email) {
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Este email ya esta asociado a una cuenta" }
        }

        const verificationToken = await generateVerificationToken(validatedValues.data.email)
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success: "Email de verificacion enviado" }
    }

    if (
        validatedValues.data.password &&
        validatedValues.data.newPassword &&
        dbUser.password
    ) {
        const hashedPassword = await bcrypt.hash(validatedValues.data.password, validatedValues.data.newPassword)
        const matchPassword = await bcrypt.compare(validatedValues.data.newPassword, dbUser.password)

        if (!matchPassword) {
            return { error: "La contraseña no es igual" }
        }

        validatedValues.data.password = hashedPassword;
        validatedValues.data.newPassword = undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...validatedValues.data,
        }
    })

    unstable_update({
        user: {
            email: dbUser.email,
            id: dbUser.id,
            image: dbUser.image,
            name: dbUser.name,
            role: dbUser.role,
            twoFactorAuth: dbUser.isTwoFactorEnabled,
          },
    });

    return { success: "Configuración cambiada!" }
}
