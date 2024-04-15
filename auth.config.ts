import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
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