import { cn } from "@/lib/utils"
import { Book } from "@/app/types/typesModels"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import {Image} from "@nextui-org/react"

interface BookArtworkProps {
    book: Partial<Book>
    aspectRatio?: 'portrait' | 'square'
    width?: number
    height?: number
    className?: string
}
export const BookArtwork: React.FC<BookArtworkProps> = ({
    book,
    aspectRatio,
    width,
    height,
    className,
    ...props
}) => {
    const imageUrl = book.coverImage || '/dashboard/book-placeholder.jpg'
    const altText = book.title || 'Sin titulo'

    return (
        <div className={cn('space-y-3', className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className='overflow-hidden rounded-md'>
                        <Image
                            src={imageUrl}
                            alt={altText}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-portrait"
                            )}
                        />
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400">{ book.title }</h3>
                <p className="text-xs text-muted-foreground">{ book.author?.name }</p>
            </div>
        </div>
    )
}
