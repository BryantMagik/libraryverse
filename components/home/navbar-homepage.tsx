"use client"

import Link from "next/link"
import { Source_Sans_3 } from "next/font/google"
import { useState } from "react"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar"

const sourceFont = Source_Sans_3({
    subsets: ['latin'],
    weight: ['200']
})
import { Link as Linkt } from "@nextui-org/link"
const links = [
    { href: "/home", label: "INICIO" },
    { href: "/about", label: "SOBRE" },
    { href: "/contact", label: "CONTACTO" },

]

export default function NavbarHome() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Navbar className="h-[110px] z-2">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <img className="h-[110px] z-0" src="/home/logo.png" alt="" /> */}
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4 h-[70px]" justify="center">
                {links.map((link) => {
                    return (
                        <NavbarItem>
                            <Link href={link.href} key={link.href} className={sourceFont.className + ''} legacyBehavior>
                                <a className="p-7 tracking-widest text-muted-foreground">{link.label}</a>
                            </Link>
                        </NavbarItem>
                    )
                })}
            </NavbarContent>
            <NavbarMenu>
                {links.map((link, index) => {
                    return (
                        <NavbarMenuItem key={`${link}-${index}`}>
                            <Linkt href={`${link.href}`}
                                key={`${link.label}`}
                            >
                                {link.label}
                            </Linkt>
                        </NavbarMenuItem >
                    )
                })}
            </NavbarMenu>
        </Navbar>
    )
}
