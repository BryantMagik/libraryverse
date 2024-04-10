"use server"

import * as z from "zod"

import { signIn } from "@/auth"

import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFiels = LoginSchema.safeParse(values)

    if (!validatedFiels.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password } = validatedFiels.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales erroneas" }
                default:
                    return { error: "Algo ha ido mal!" }
            }
        }
        throw error
    }

} 