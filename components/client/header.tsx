"use client"
import { poppins } from "@/components/ui/font"
import Navbar from "./navbar/navbar"
import { ThemeToggle } from "@/components/themeToggle"
import Search from "../ui/search"

export function Header() {
    return (
        <nav className='relative flex flew-wrap items-center justify-between dark:bg-dark h-[60px] bg-teal-400'>
            <div className='flex flex-wrap items-center justify-between px-3 '>
                <h1 className={`${poppins.className} text-white `}>LibraryVerse</h1>
            </div>
            {/* SEPARARLO */}
            <div className="flex flex-wrap items-center justify-between px-3">
                <Search placeholder={"Hola"} />
            </div>
            <div className="flex flex-wrap items-center space-x-6 px-3 dark:text-white">
                <ThemeToggle />
                <Navbar />
            </div>
        </nav>
    )
}
