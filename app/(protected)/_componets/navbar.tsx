"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import { usePathname } from "next/navigation"
import { UserButton } from "@/components/auth/user-button"
import SearchBooks from "@/components/ui/search"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex justify-between items-center w-full px-4 text-white dark:bg-black nav bg-emerald-500 sm:flex-none">
            <div className='flex flex-wrap h-20 items-center justify-between px-3'>
                <h1 className={`${poppins.className} text-white `}>LibraryVerse</h1>
            </div>
            <div className="">
                <SearchBooks />
            </div>
            <div className="">
                <ThemeToggle />
            </div>
            <UserButton />
        </nav>
    )
}
