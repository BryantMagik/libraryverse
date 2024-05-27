"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import { UserButton } from "@/app/(protected)/_componets/user-button"
import { useEffect } from "react"
import { useCurrentUser } from "@/hook/use-current-user";


export default function NavbarApp() {

    const { session } = useCurrentUser()

    return (
        <nav className="flex justify-between items-center w-full px-4 text-library-600 dark:bg-black nav dark:text-emerald-400 bg-library-200 sm:flex-none">
            <div className='flex flex-wrap h-20 items-center justify-between px-3'>
                <h1 className={`${poppins.className} text-lg font-semibold`}>LibraryVerse</h1>
            </div>
            <div className="flex items-center space-x-6">
                <ThemeToggle />
                <UserButton label={"ha"} user={session} />
            </div>
        </nav>
    )
}
