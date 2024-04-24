
import { cn } from "@/lib/utils"
import { Book } from "../data/books"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import Image from "next/image"

interface BookArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Book
    aspectRatio?: 'portrait' | 'square'
    width?: number
    height?: number
    className?: string
}

export const BookArtwork: React.FC<BookArtworkProps> = ({ book, aspectRatio, width, height, className, ...props }) => {
    return (
        <div className={cn('space-y-3', className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className='overflow-hidden rounded-md'>
                        <Image
                            src={book.img}
                            alt={book.title}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )}
                        />
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
            </div>
        </div>
    )

}
