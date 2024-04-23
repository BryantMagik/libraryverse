"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user-button"
import Search from "@/components/ui/search"
import SideNav from "./sideNav"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex justify-between items-center w-full h-20 px-4 text-white dark:bg-black nav bg-emerald-500 z-5">
            <div className='flex flex-wrap items-center justify-between px-3 '>
                <h1 className={`${poppins.className} text-white `}>LibraryVerse</h1>
            </div>
            <div className="">
                <Search placeholder={"Hola"} />
            </div>
            <div className="">
                <ThemeToggle />
            </div>
            <UserButton />
        </nav>
    )
}
