import { Image } from "@nextui-org/react"
import { Book } from "@prisma/client"
import { es } from 'date-fns/locale'
import Link from "next/link"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { statusLabels } from "@/app/types/typesModels"
import { useEffect } from "react"

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
    const updatedAt = book.updatedAt ? new Date(book.updatedAt) : null

    let formattedDate
    if (updatedAt) {
        formattedDate = formatDistanceToNow(updatedAt, { addSuffix: true, locale: es })
    } else {
        formattedDate = 'Fecha de actualización no disponible'
    }

    useEffect(() => {
        console.log('book:', book)
    }, [book])

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
                <Link key={book.id} href={`/historias/${book.id}`}>
                    <h3 className="font-medium leading-none text-black dark:text-emerald-400 hover:underline p-2">{book.title}</h3>
                </Link>
                {book.status && (
                    <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400 p-2">{statusLabels[book.status]}</h3>
                )}
                <p className="p-2">Actualizada {formattedDate}</p>
            </div>
            <div>
                <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400">OPCIONES</h3>
            </div>
        </div>
    )
}

