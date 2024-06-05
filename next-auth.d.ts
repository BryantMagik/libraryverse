import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client"
import { User } from "@/app/types/typesModels"
import { JWT } from "next-auth/jwt"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
    isOAuth: boolean;
    twoFactorAuth: boolean;
} & User

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

declare module "next-auth/jwt" {
    interface JWT extends User {}
}