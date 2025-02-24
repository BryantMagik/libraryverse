"use server"
import { signOut } from "@/auth"

export const logout = async () => {

    await signOut({ redirectTo: "/dashboard" })
    window.location.href = "/dashboard"
}