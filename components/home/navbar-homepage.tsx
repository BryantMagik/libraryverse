"use client"
import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";

export default function NavbarHome() {
    return (
        <nav className="flex flex-col lg:flex-row items-center justify-between w-full h-20 px-4 text-white bg-almond-100">
            <div className="text-lg font-bold">LibraryVerse</div>
            <div className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0">
                <AuthButton mode="modal" formType="login" asChild>
                    <Button className="rounded-full bg-almond-500 text-white hover:bg-almond-700 lg:mr-4" size="lg">Iniciar Sesión</Button>
                </AuthButton>
                <AuthButton mode="modal" formType="register" asChild>
                    <Button className="rounded-full bg-almond-500 text-white hover:bg-almond-700" size="lg">Registro</Button>
                </AuthButton>
            </div>
        </nav>
    )
}
