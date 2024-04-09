"use client";

import { Button } from "evergreen-ui";
import Link from "next/link"

const links = [
    { href: "/", label: "Home" },
    { href: "/auth/login", label: "Login" },
]

export default function Navbar() {
    return (
        <>
            {links.map(link => (
                <button className="" key={link.href}>
                    <Link href={link.href} >
                        {link.label}
                    </Link>
                </button>
            ))}
        </>
    )
}

