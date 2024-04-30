"use client"

import { AuthButton } from "@/components/auth/auth-button"
import { Button } from "@/components/ui/button"
import { IoPersonCircleOutline } from "react-icons/io5"

export default function NavbarHome() {

    return (
        <nav className="flex w-full h-20 px-4 text-white bg-almond-100 justify-center">
            <div>
                LibraryVerse
            </div>

            <AuthButton mode="modal" formType={"login"} asChild >
                <Button className="rounded-full bg-almond-500 text-white hover:bg-almond-700" size="lg">Inciar Sesión</Button>
            </AuthButton>
            <AuthButton mode="modal" formType={"register"} asChild >
                <Button className="rounded-full bg-almond-500 text-white hover:bg-almond-700" size="lg">Registro</Button>
            </AuthButton>
        </nav>
    )
}