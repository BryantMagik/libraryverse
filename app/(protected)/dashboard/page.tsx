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
import { db } from '@/lib/db';
import { BookArtwork } from '../_componets/dashboard/bookArtwork';
import { getBooks } from '@/data/queries';
import BooksView from '../_componets/dashboard/booksView';

const DashboardPage = () => {
    return (
        <BooksView />
    )
}

export default DashboardPage