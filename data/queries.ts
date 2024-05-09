import { cache } from "react";
import { db } from "@/lib/db";

export const getBooks = cache(async () => {
    const data = await db.book.findMany({
        include: {
            author: true,
        }
    })

    return data
})