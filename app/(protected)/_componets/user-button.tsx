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
import { LogoutButton } from "@/components/auth/logout-button"
import { SettingsButton } from "@/components/auth/settings-button"
import { ExtendedUser } from "@/next-auth"

interface UserInfoProps {
    user?: ExtendedUser
}
export const UserButton = ({ user }: UserInfoProps) => {
    return (
        <>
            <h3 className="relative text-sm font-semibold text-muted-foreground">
                ¡Te damos la bienvenida,
                <span className="dark:text-emerald-500 text-library-600 fade-in relative z-10">
                    {user?.name}!
                    <div className="relative inset-x-20 top-0 bg-gradient-to-r from-transparent dark:via-emerald-500 via-library-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="relative inset-x-20 top-0 bg-gradient-to-r from-transparent dark:via-emerald-500 via-library-500 to-transparent h-px w-3/4" />
                    <div className="relative inset-x-40 bottom-1 bg-gradient-to-r from-transparent dark:via-emerald-500 via-library-500 to-transparent h-[4px] w-1/4 blur-sm" />
                    <div className="relative inset-x-40 bottom-1 bg-gradient-to-r from-transparent dark:via-emerald-500 via-library-500 to-transparent h-px w-1/4" />
                </span>
            </h3>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className="bg-black">
                            <FaUser className="text-white" />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <SettingsButton>
                        <DropdownMenuItem>
                            <PersonIcon className="h-4 w-4 mr-2" />
                            Cuenta
                        </DropdownMenuItem>
                    </SettingsButton>
                    <LogoutButton>
                        <DropdownMenuItem>
                            <ExitIcon className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </DropdownMenuItem>
                    </LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}