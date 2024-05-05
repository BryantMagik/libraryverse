import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const books = await db.book.findMany({
            where: { status: 'PUBLISHED' }
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error });
    }
}
