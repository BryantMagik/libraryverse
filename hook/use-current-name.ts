"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"

export const useCurrentName = () => {

    const session = useSession()

    useEffect(() => {
        if (session.data) {
            console.log("Nombre actual:", session.data.user.name);
        }

    }, [])

    console.log("HOOK DATOS: ", session)
    return { session: session.data?.user, revalidate: 2 }
}