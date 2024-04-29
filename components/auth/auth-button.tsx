"use client"

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import React from "react";

interface AuthButtonProps {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
    formType: "login" | "register"
}

export const AuthButton: React.FC<AuthButtonProps> = ({ children, mode = "redirect", asChild, formType }) => {
    const router = useRouter()
    const onClick = () => {
        const route = formType === "login" ? "/auth/login" : "/auth/register";
        router.push(route);
    }

    if (mode === "modal") {
        <Dialog>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                {formType === "login" ? <LoginForm /> : <RegisterForm />}
            </DialogContent>
        </Dialog>
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}