import { PiHouseSimpleLight } from "react-icons/pi"
import { BsBookshelf } from "react-icons/bs"
import { IoIosLogOut } from "react-icons/io"
import { GoBook } from "react-icons/go"
import { SlNotebook } from "react-icons/sl"
import { IoCreateOutline } from "react-icons/io5"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"


const links = [
    { href: "/dashboard", label: "Home", Icon: PiHouseSimpleLight },
    { href: "/create", label: "Crear Historia", Icon: IoCreateOutline },
    { href: "/book", label: "Buscar Libros", Icon: SlNotebook },
    { href: "/categorias", label: "Categorias", Icon: GoBook },
    { href: "/bookshelf", label: "Bookshelf", Icon: BsBookshelf },
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                return (
                    <Link href={link.href} key={link.href} passHref
                        className={`flex h-[48px] grow items-center border-0 justify-center gap-2 rounded-md p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3 md:w-44`}
                    >
                        <Button
                            variant={pathname === link.href ? "default" : "outline"}
                            className={`flex h-[48px] grow items-center border-0 justify-center gap-2 rounded-md p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3 md:w-44
                            ${pathname === link.href
                                    ? "bg-library-400 dark:bg-emerald-500 hover:bg-library-600 text-white"
                                    : "bg-library-200 text-library-500 hover:bg-library-600 hover:text-white dark:bg-black dark:hover:bg-emerald-600 dark:text-white"
                                }`}
                        >
                            <link.Icon className={`text-lg ${pathname === link.href}`} />
                            <span className={`hidden md:block ${pathname === link.href}`}>
                                {link.label}
                            </span>
                        </Button>
                    </Link>
                )
            })}
        </>
    )
}
