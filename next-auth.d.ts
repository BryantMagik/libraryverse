import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

import { JWT } from "@/core/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
}