import { cn } from "@/lib/utils"
import { Book } from "@/app/types/typesModels"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import Image from "next/image"

interface BookArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
    aspectRatio?: 'portrait' | 'square'
    width?: number
    height?: number
    className?: string
}
export const BookArtwork: React.FC<BookArtworkProps> = ({
    book,
    aspectRatio = 'square',
    width = 300,
    height = 300,
    className,
    ...props
}) => {
    const imageUrl = book.coverImage || '/path/to/default-image.png'
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
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )}
                        />
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author?.name ?? "Nombre no disponible"}</p>
            </div>
        </div>
    )
}
