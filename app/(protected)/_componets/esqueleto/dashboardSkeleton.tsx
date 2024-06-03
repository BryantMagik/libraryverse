"use client"

import { Card, Skeleton, Button } from "@nextui-org/react"
import { Separator } from "@radix-ui/react-separator"
import { useState } from "react"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import CardSkeleton from "./cardSkeleton"

const DashboardSkeleton = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    }

    return (
        <div className="">
            <Skeleton isLoaded={isLoaded} className="h-10 w-6/6 mb-2" />
            <Skeleton isLoaded={isLoaded} className="h-3 w-4/6" />
            <div className="grid grid-cols-3 mt-7">
                <div>
                    <CardSkeleton />
                </div>
                <div>
                    <CardSkeleton />
                </div>
                <div>
                    <CardSkeleton />
                </div>
            </div>
        </div>
    )
}

export default DashboardSkeleton