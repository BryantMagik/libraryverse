"use client"

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
    children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = () => {
        localStorage.clear()
        sessionStorage.clear()
    
        logout().then(() => {
            window.location.href = "/dashboard" 
        })
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
