import { PiHouseSimpleLight } from "react-icons/pi";
import { BsBookshelf } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { GoBook } from "react-icons/go";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";


const links = [
    { href: "/dashboard", label: "Home", Icon: PiHouseSimpleLight },
    { href: "/categorias", label: "Categorias", Icon: GoBook },
    { href: "/bookshelf", label: "Bookshelf", Icon: BsBookshelf },
    { href: "/login", label: "Cerrar Sesión", Icon: IoIosLogOut }
];

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex flex-col  space-y-4 p-4 mt-20">
            {links.map(({ href, label, Icon }) => (
                <Link href={href} key={href} passHref>
                    <Button
                        variant={pathname === href ? "default" : "outline"}
                        className={`border-0 mt-4 flex items-start justify-start w-44 space-x-2 py-2 px-4 rounded font-medium ${pathname === href ? "bg-blue-500 text-white" : "bg-emerald-500 hover:bg-gray-200 text-gray-800"
                            }`}
                    >
                        <Icon className="text-white text-lg" />
                        <span className="text-white">{label}</span>
                    </Button>
                </Link>
            ))}
        </nav>
    );
}
