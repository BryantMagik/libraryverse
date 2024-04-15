"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DashboardPage = () => {
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
            <h1>DASHBOARD PARA API DE BOOKS</h1>
        </>
    )
}

export default DashboardPage