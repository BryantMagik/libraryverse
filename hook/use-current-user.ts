"use client"

import { useSession } from "next-auth/react"

export const useCurrentUser = () => {

    const session = useSession()

    console.log("HOOK DATOS: ", session)
    return { session: session.data?.user, revalidate: 2 }
}