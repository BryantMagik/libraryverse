import React from "react"
import { Card, Skeleton, Button } from "@nextui-org/react"

export default function CardSkeleton() {
    const [isLoaded, setIsLoaded] = React.useState(false)

    const toggleLoad = () => {
        setIsLoaded(!isLoaded)
    }

    return (
        <Card className="w-[150px] md:w-[270px] space-y-5 p-4" radius="lg">
            <Skeleton isLoaded={isLoaded} className="rounded-lg">
                <div className="h-44 rounded-lg bg-secondary"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary"></div>
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
            </div>
        </Card>

    )
}
