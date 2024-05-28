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
    label: string
}

export const UserButton = ({ user, label }: UserInfoProps) => {

    return (
        <>
            <h3 className="text-sm font-semibold text-muted-foreground">
                ¡Te damos la bienvenida, <span className="dark:text-emerald-500 text-library-600">{user?.name}!</span>
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