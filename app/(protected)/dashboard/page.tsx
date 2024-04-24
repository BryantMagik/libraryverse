"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { CarouselPlugin } from "../_componets/dashboard";


const DashboardPage = () => {



    return (
        <>
            <CarouselPlugin />
        </>
    )
}

export default DashboardPage