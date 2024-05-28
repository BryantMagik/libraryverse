import React from "react"

import { auth, signIn, signOut } from "@/auth"

type Props = {}

const Header = async (props: Props) => {
    const session = await auth()

    return (
        <><div>{session?.user.name}</div></>
    )
}

export default Header