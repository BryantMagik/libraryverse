"use server"

import * as z from "zod";
import { BookSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";

export const postBook = async (values: z.infer<typeof BookSchema>) => {

    console.log(values)

    const validatedFields = BookSchema.safeParse(values);
    // console.log("Validated Fields:", validatedFields);

    if (!validatedFields.success) {
        console.error("Validation Error:", validatedFields.error);
        return { error: "Validation failed" };
    }

    const user = await currentUser();

    if (!user) {
        console.error("No user logged in");
        return { error: "No user logged in" };
    }
    console.log("Current User:", user);

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        console.error("No logged-in user found in the database");
        return { error: "User not logged in" };
    }
    console.log("Database User:", dbUser);

    const { title, description,coverImage, genre, status } = validatedFields.data;

    await db.book.create({
        data: {
            title,
            description,
            genre,
            coverImage,
            authorId: dbUser.id,
            status,
        },
    })

    return {
        success: "Has creado tu propia historia correctamente",
    }
}
