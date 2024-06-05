import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { UserRole } from '@prisma/client'
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {

            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id)

            if (!existingUser || !existingUser.emailVerified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) {
                    return false
                }
                // eliminado de two factor para el siguiente login
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })
            }

            return true
        },
        async session({ token, session }) {

            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            if (session.user) {
                session.user.twoFactorAuth = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.name = token.name as string
                session.user.lastname = token.lastname as string
                session.user.nickname = token.nickname as string
                session.user.email = token.email as string
                session.user.isOAuth = token.isOAuth as boolean
                session.user.country = token.country
                session.user.dateOfBirth = token.dateOfBirth as string
            }
            console.log("Session:", session.user.name)
            return session

        },
        async jwt({ token }) {

            console.log("Token:", token.name)

            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            token.nickname = existingUser.nickName
            token.lastname = existingUser.lastName
            token.dateOfBirth = existingUser.dateOfBirth
            token.country = existingUser.country
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})