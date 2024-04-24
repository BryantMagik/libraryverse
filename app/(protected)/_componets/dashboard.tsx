import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BookArtwork } from "./dashboard/bookArtwork";
import { library } from "./data/books";

//TODO::OJO


export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Lee ahora
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        //TODOO SUBTITULO ADEACUDO.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {library.map((book) => (
                            <BookArtwork
                            //TODO KEYS CAMBIARLAS
                                key={book.title}
                                book={book}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                <div className='mt-6 space-y-1'>
                    <h2 className='text-2xl font-semibold tracking-tight'>
                        Made for You
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        Your personal playlists. Updated daily.
                    </p>
                </div>
                <Separator className='my-4' />

            </div>
        </div>

    )
}
