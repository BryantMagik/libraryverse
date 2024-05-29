import { Button, Image } from "@nextui-org/react"
import { Book } from "@/app/types/typesModels"
import { es } from 'date-fns/locale'
import Link from "next/link"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { statusLabels } from "@/app/types/typesModels"
import { MdOutlineDelete } from "react-icons/md"

interface BookArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
    wdth?: number
    hght?: number
    removeBook: (bookId: string) => void
}

export const BookArtTableBookshelf: React.FC<BookArtTableProps> = ({
    book,
    wdth = 80,
    hght = 125,
    removeBook,
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

    if (book.id === undefined) {
        console.log("book.id is undefined")
    }

    const AuthorName = book.author?.name || 'Nombre no disponible'

    return (
        <div className="flex flex-row md:pt-2 pt-2">
            <div className="content-center">
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={wdth}
                    height={hght}
                />
            </div>
            <div className="flex-1 ml-5 content-center">
                <Link key={book.id} href={`/historias/${book.id}`}>
                    <h3 className="font-medium leading-none text-black dark:text-emerald-400 hover:underline p-2">{book.title}</h3>
                </Link>
                <p className="text-medium text-muted-foreground p-2">{AuthorName}</p>
                {book.status && (
                    <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400 p-2">{statusLabels[book.status]}</h3>
                )}
                <p className="text-xs text-muted-foreground p-2">Actualizada {formattedDate}</p>
            </div>
            <div className="content-center">
                <Button
                    onClick={() => book.id && removeBook(book.id)}
                    disabled={!book.id}
                    className="hover:bg-red-500 dark:hover:bg-red-500 hover:text-white p-2 rounded-full bg-library-300 text-white dark:bg-emerald-500"
                >
                    <MdOutlineDelete size={25} />
                </Button>
            </div>
        </div>
    )
}

