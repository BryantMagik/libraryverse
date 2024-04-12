
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email, // Acceso a la imagen del perfil ojo
                    image: profile.picture,
                };
            },
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                };
            },
        }),
        Credentials({
            async authorize(credentials) {

                const validatedFiels = LoginSchema.safeParse(credentials)

                if (validatedFiels.success) {
                    const { email, password } = validatedFiels.data

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null

                    const passwordMatch = await bcrypt.compare(password,user.password)

                    if (passwordMatch) return user
                }
                return null
            }
        })
    ],
} satisfies NextAuthConfig