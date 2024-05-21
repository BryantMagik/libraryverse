"use client"
import { Children, useEffect } from "react";
import NavbarApp from "./_componets/navbarApp";
import SideNav from "./_componets/sideNav";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const userRole = useCurrentUser()
    const session = useSession()

    useEffect(() => {
        if (session.data === null) {
            session.status
            window.location.reload()
            return;
        }
    }, [session])

    if (!userRole) {
        return null
    }
    return (
        <>
            <NavbarApp />
            <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
                <div className='w-full flex-none md:w-64'>
                    <SideNav />
                </div>
                <div className='flex-grow p-6 md:overflow-y-auto md:p-12 no-scrollbar'>{children}</div>
            </div>
        </>
    )

}

export default ProtectedLayout