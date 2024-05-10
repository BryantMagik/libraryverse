import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"


export const getIsAdmin = async () => {

    const role = await currentRole()

    if (role === UserRole.ADMIN) {
        return true
    }
    return false
}