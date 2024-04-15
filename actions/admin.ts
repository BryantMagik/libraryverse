"use server";

import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export const admin = async () => {
    const role = await currentRole()

    if (role === UserRole.ADMIN) {
        return { success: "¡Acción en el servidor permitida!" }
    }

    return { error: "¡Acción en el servidor prohibida!" }
};
