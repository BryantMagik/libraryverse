"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import { usePathname } from "next/navigation"
import { UserButton } from "@/components/auth/user-button"

export default function NavbarApp() {

    const pathname = usePathname()


    return (
        <nav className="flex justify-between items-center w-full px-4 text-library-600 dark:bg-black nav dark:text-emerald-400 bg-library-200 sm:flex-none">
            <div className='flex flex-wrap h-20 items-center justify-between px-3'>
                <h1 className={`${poppins.className} text-lg font-semibold`}>LibraryVerse</h1>
            </div>
            <div className="flex items-center space-x-6">
                <ThemeToggle />
                <UserButton />
            </div>
        </nav>
    )
}
