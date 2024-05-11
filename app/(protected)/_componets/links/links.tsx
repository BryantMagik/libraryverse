import { PiHouseSimpleLight } from "react-icons/pi"
import { BsBookshelf } from "react-icons/bs"
import { IoIosLogOut } from "react-icons/io"
import { GoBook } from "react-icons/go"
import { SlNotebook } from "react-icons/sl"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"


const links = [
    { href: "/dashboard", label: "Home", Icon: PiHouseSimpleLight },
    { href: "/libros", label: "Libros", Icon: SlNotebook },
    { href: "/categorias", label: "Categorias", Icon: GoBook },
    { href: "/bookshelf", label: "Bookshelf", Icon: BsBookshelf },
    { href: "/login", label: "Cerrar Sesión", Icon: IoIosLogOut }
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
                        <Button variant={pathname === link.href ? "default" : "outline"}
                            className={`flex h-[48px] grow items-center border-0 justify-center gap-2 rounded-md p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3 md:w-44 ${pathname === link.href ? "bg-blue-500 text-white dark:bg-emerald-500" : "bg-emerald-500 hover:bg-gray-200 text-gray-800 dark:bg-black"}`}
                        >
                            <link.Icon className="text-white text-lg" />
                            <span className="text-white hidden md:block">{link.label}</span>
                        </Button>
                    </Link>
                )
            })}
        </>
    )
}
