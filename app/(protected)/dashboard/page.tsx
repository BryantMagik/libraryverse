import * as React from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import BooksView from "../_componets/dashboard/booksView";
import { db } from '@/lib/db';
import { BookArtwork } from '../_componets/dashboard/bookArtwork';


const DashboardPage = async () => {
    const books = await db.book.findMany()


    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Lee ahora
                    </h2>
                    <p className="text-sm text-muted-foreground">
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {books.map((book) => (
                            <BookArtwork key={book.id} book={book} width={300} height={200} />
                        ))}
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                <div className='mt-6 space-y-1'>
                    <h2 className='text-2xl font-semibold tracking-tight'>
                        TEST
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        TEST
                    </p>
                </div>
                <Separator className='my-4' />
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">

                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>
        </div>
    )
}

export default DashboardPage