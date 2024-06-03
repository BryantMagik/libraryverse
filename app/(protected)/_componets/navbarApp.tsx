"use client";

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import { UserButton } from "@/app/(protected)/_componets/user-button"
import { useSession } from "next-auth/react"
import { FlipWords } from "@/components/ui/flip-words"

export default function NavbarApp() {
    const { data: session } = useSession()
    const words = ["LibraryVerse", "Lee", "Escribe", "Comparte"]

    return (
        <nav className="grid grid-cols-1 md:grid-cols-2 justify-between items-center w-full px-4 text-library-600 dark:bg-black nav dark:text-emerald-400 bg-library-200 sm:flex-none ">
            <div className="flex h-20 items-center md:place-content-start place-content-center px-3">
                <h1 className={`${poppins.className} text-lg font-semibold`}><FlipWords words={words} /></h1>
            </div>
            <div className="flex items-center space-x-6 place-content-end">
                <ThemeToggle />
                {session ? (
                    <UserButton user={session.user} />
                ) : (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Login
                    </button>
                )}
            </div>

        </nav>
    )
}
