"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Source_Sans_3 } from "next/font/google";
import Image from "next/image";
import { AuthButton } from "../auth/auth-button";

const sourceFont = Source_Sans_3({
    subsets: ["latin"],
    weight: ["400"],
});

const links = [
    { href: "/home", label: "INICIO" },
    { href: "/about", label: "SOBRE" },
    { href: "/contact", label: "CONTACTO" },
]

export default function NavbarHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="grid grid-cols-2 md:grid-cols-3 justify-between items-center w-full px-4 text-library-600 dark:bg-black nav dark:text-emerald-400 bg-library-200 sm:flex-none">
            <div className="flex h-20 items-center md:place-content-start place-content-center px-28">
                <h1 className={`${sourceFont.className} text-5xl`}>LibraryVerse</h1>
            </div>
            <div className="hidden md:block place-content-center space-x-20">
            </div>
            <div className="flex items-center space-x-6 place-content-end md:hidden">
                <button onClick={toggleMenu} className="hover:bg-library-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden items-center grid grid-cols-1">
                    <div>
                        <AuthButton mode="modal" formType="login" asChild>
                            <button className="hover:text-white">
                                <span className="hover:text-library-700 underline-animation">Iniciar Sesión</span>
                            </button>
                        </AuthButton>
                    </div>

                </div>
            )}
            <div className="hidden md:flex items-center space-x-6 place-content-end">
                <AuthButton mode="modal" formType="login" asChild>
                    <button className="hover:text-white">
                        <span className="hover:text-library-700 underline-animation">Iniciar Sesión</span>
                    </button>
                </AuthButton>
                <AuthButton mode="modal" formType="register" asChild>
                    <Button className="text-white bg-library-500 hover:bg-library-700 hover:text-white" size="lg">
                        ¡Comencemos!
                    </Button>
                </AuthButton>
            </div>
        </nav>
    )
}
