import { Image } from "@nextui-org/react"
import { Book } from "@prisma/client"


interface BookArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
    wdth?: number
    hght?: number
}

export const BookArtTable: React.FC<BookArtTableProps> = ({
    book,
    wdth = 80,
    hght = 125,
}) => {
    const imageUrl = book.coverImage || '/dashboard/book-placeholder.jpg'
    const altText = book.title || 'Sin titulo'
    return (
        <div className="flex flex-row md:pt-2 pt-2">
            <div className="">
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={wdth}
                    height={hght}
                />
            </div>
            <div className="flex-1 ml-5">
                <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400">{book.title}</h3>
            </div>
            <div>
                <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400">OPCIONES</h3>
            </div>
        </div>
    )
}