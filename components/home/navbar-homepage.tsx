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
import Image from "next/image"
const sourceFont = Source_Sans_3({
    subsets: ['latin'],
    weight: ['200']
})
const links = [
    { href: "/home", label: "INICIO" },
    { href: "/about", label: "SOBRE" },
    { href: "/contact", label: "CONTACTO" },

]

export default function NavbarHome() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="h-[110px] z-2">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Image src="/home/logo.png" height={110} width={300} alt="LogoVerse"/>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4 h-[70px]" justify="center">
                {links.map((link) => {
                    return (
                        <NavbarItem key={link.label}>
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
                            <Link href={`${link.href}`}
                                key={`${link.label}`}
                            >
                                {link.label}
                            </Link>
                        </NavbarMenuItem >
                    )
                })}
            </NavbarMenu>
        </Navbar>
    )
}
