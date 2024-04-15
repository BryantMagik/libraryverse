"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { FaUser } from "react-icons/fa"
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons"
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "@/components/auth/logout-button"
import { SettingsButton } from "@/components/auth/settings-button"

export const UserButton = () => {
    const user = useCurrentUser()

    return (
        <>
            <h3 className="text-sm font-semibold text-muted-foreground">
                Hola, <span className="dark:text-emerald-500 text-white">{user.session?.name}</span>
            </h3>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user.session?.image || ""} />
                        <AvatarFallback className="bg-black">
                            <FaUser className="text-white" />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <LogoutButton>
                        <DropdownMenuItem>
                            <ExitIcon className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </DropdownMenuItem>
                    </LogoutButton>
                    <SettingsButton>
                        <DropdownMenuItem>
                            <PersonIcon className="h-4 w-4 mr-2" />
                            Cuenta
                        </DropdownMenuItem>
                    </SettingsButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}