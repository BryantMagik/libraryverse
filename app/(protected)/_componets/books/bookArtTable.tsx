import { Book } from "@/app/types/typesModels"
import { es } from 'date-fns/locale'
import Link from "next/link"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { statusLabels } from "@/app/types/typesModels"
import { Button, Image } from "@nextui-org/react"
import { MdOutlineDelete } from "react-icons/md"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown"
import { SlOptions } from "react-icons/sl"
import { TbEyeShare } from "react-icons/tb"
import { CiEdit } from "react-icons/ci"
import { FaRegEyeSlash } from "react-icons/fa"

interface BookArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
    wdth?: number
    hght?: number
    removeBook: (bookId: string) => void
    editBook: (bookId: string) => void
    publicBook?: (bookId: string) => void
    cancelPublication?: (bookId: string) => void
}

export const BookArtTable: React.FC<BookArtTableProps> = ({
    book,
    wdth = 80,
    hght = 125,
    removeBook,
    editBook,
    publicBook,
    cancelPublication,
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
                {book.status && (
                    <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400 p-2">{statusLabels[book.status]}</h3>
                )}
                <p className="text-xs text-muted-foreground p-2">Actualizada {formattedDate}</p>
            </div>
            <div className="flex flex-col place-content-center">
                <Dropdown>
                    <DropdownTrigger>
                        <Button aria-label="Options" className="hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-2 mb-2 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                            <SlOptions size={25} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Book actions">
                        <DropdownSection>
                            <DropdownItem textValue="Edit Book" onClick={() => book.id && editBook(book.id)}>
                                <span className="flex flex-row">
                                    <CiEdit size={18} /><span className="ml-1">Editar Libro</span>
                                </span>
                            </DropdownItem>
                        </DropdownSection>
                        {book.status === 'PUBLISHED' ? (
                            <DropdownSection>
                                <DropdownItem textValue="Cancel Publication" onClick={() => book.id && cancelPublication && cancelPublication(book.id)}>
                                    <span className="flex flex-row">
                                        <FaRegEyeSlash size={18} /><span className="ml-1">Anular Publicación</span>
                                    </span>
                                </DropdownItem>
                            </DropdownSection>
                        ) : (
                            <DropdownSection>
                                <DropdownItem textValue="Publish Book" onClick={() => book.id && publicBook && publicBook(book.id)}>
                                    <span className="flex flex-row">
                                        <TbEyeShare size={18} /><span className="ml-1">Publicar Historia</span>
                                    </span>
                                </DropdownItem>
                            </DropdownSection>
                        )}
                        <DropdownSection>
                            <DropdownItem textValue="Delete Book" onClick={() => book.id && removeBook(book.id)}>
                                <span className="flex flex-row">
                                    <MdOutlineDelete size={18} /><span className="ml-1">Eliminar Libro</span>
                                </span>
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}

