import * as React from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { BookArtwork } from './bookArtwork'
import { getBooks } from '@/data/queries'

const BooksView: React.FC = async () => {
    const data = await getBooks()

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Historias Completadas
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Lee de principio a fin
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {data.map((book) => (
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

export default BooksView
