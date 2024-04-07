"use server"

import * as z from "zod"

import { LoginSchema } from "@/schemas"

export const login = async (values: z.infer<typeof LoginSchema>) => {

    //Validación

    const validatedFiels = LoginSchema.safeParse(values)

    if (!validatedFiels.success) {
        return { error: "Invalid Fields!" }
    }

    return { success: "Email sent!" }

} 