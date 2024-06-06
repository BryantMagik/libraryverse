"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import { UserButton } from "@/app/(protected)/_componets/user-button"
import { useSession } from "next-auth/react"
import { FlipWords } from "@/components/ui/flip-words"
import SearchModal from "./searchModal"

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
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}
