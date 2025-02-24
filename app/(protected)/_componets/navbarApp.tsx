"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import { UserButton } from "@/app/(protected)/_componets/user-button"
import { useSession } from "next-auth/react"
import { FlipWords } from "@/components/ui/flip-words"
import SearchModal from "./searchModal"
import { CiLogin } from "react-icons/ci"
import { AuthButton } from "@/components/auth/auth-button"

export default function NavbarApp() {
    const { data: session } = useSession()
    const words = ["LibraryVerse", "Lee", "Escribe", "Comparte"]

    return (
        <nav className="grid grid-cols-2 md:grid-cols-3 items-center w-full px-4 text-library-600 dark:bg-black nav dark:text-emerald-400 bg-library-200 sm:flex-none">
            <div className="flex h-20 items-center md:justify-start justify-center px-3">
                <h1 className={`${poppins.className} text-lg font-semibold hidden md:inline`}><FlipWords words={words} /></h1>
                <h1 className={`${poppins.className} text-lg font-semibold md:hidden inline `}>LibraryVerse</h1>
            </div>
            <div className="flex justify-center md:justify-end md:col-span-2 w-full">
                <div className="flex space-x-10 items-center">
                    <SearchModal placeholder='Busca historias...' />
                    <ThemeToggle />
                    {session ? (
                        <UserButton user={session.user} />
                    ) : (
                        <AuthButton mode="modal" formType="login" asChild>
                            <button className="flex px-2 py-2 rounded-full bg-white text-library-400 items-center justify-center transform transition-transform duration-400 hover:scale-125 dark:bg-emerald-400 dark:text-white">
                                <CiLogin size={40} className="m-auto" />
                            </button>
                        </AuthButton>
                    )}
                </div>
            </div>
        </nav>
    )
}
