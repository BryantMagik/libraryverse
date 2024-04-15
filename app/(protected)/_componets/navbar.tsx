"use client"

import { poppins } from "@/components/ui/font"
import { ThemeToggle } from "./darkmode/themeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user-button"
import Search from "@/components/ui/search"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex justify-between items-center w-full h-20 px-4 text-white dark:bg-black nav bg-emerald-500 z-5">
            <div className='flex flex-wrap items-center justify-between px-3 '>
                <h1 className={`${poppins.className} text-blak `}>LibraryVerse</h1>
            </div>
            <div className="flex flex-wrap justify-between px-20 text-black">
                <Button
                    asChild
                    variant={pathname === "/server" ? "default" : "outline"}
                >
                    <Link href="/dashboard">
                        Inicio
                    </Link>
                </Button>
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
