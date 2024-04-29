"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BooksView } from "../_componets/booksView";


const DashboardPage = () => {



    return (
        <>
            <BooksView />
        </>
    )
}

export default DashboardPage