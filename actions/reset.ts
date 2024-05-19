"use server"

import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {

    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "El correo electrónico proporcionado es inválido." }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "No se encontró ninguna cuenta asociada a ese correo electrónico." }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña." }
}
