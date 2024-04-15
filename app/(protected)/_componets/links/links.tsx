import { Button } from "@/components/ui/button";
import Link from "next/link"

const links = [
    { href: "/", label: "Home" },
    { href: "/auth/login", label: "Login" },
]

export default function Navbar() {
    return (
        <>
            {links.map(link => (
                <Button className="" key={link.href}>
                    <Link href={link.href} >
                        {link.label}
                    </Link>
                </Button>
            ))}
        </>
    )
}