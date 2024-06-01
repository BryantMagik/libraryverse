import { Chapter } from "@/app/types/typesModels"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown"
import { Button } from "@nextui-org/react"
import { SlOptions } from "react-icons/sl"
import { FaRegEdit } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"

interface HistoryArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter: Partial<Chapter>
    editChapter?: (chapterId: string) => void
    removeChapter?: (chapterId: string) => void
}

export const HistoryArtTable: React.FC<HistoryArtTableProps> = ({
    chapter,
    editChapter,
    removeChapter,
}) => {

    return (
        <div className="flex flex-row md:pt-2 pt-2">
            <div className="content-center">
            </div>
            <div className="ml-5 content-center">
                <h3 className="font-medium leading-none text-black dark:text-emerald-400 hover:underline p-2">
                    Capitulo {chapter.order}:
                </h3>
            </div>
            <h3 className="flex-1 content-center font-medium leading-none italic text-black dark:text-emerald-400 hover:underline p-2">
                {chapter.title}
            </h3>
            <div className="flex flex-col place-content-center">
                <Dropdown>
                    <DropdownTrigger>
                        <Button aria-label="Options" className="hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-2 mb-2 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                            <SlOptions size={25} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Chapter actions">
                        <DropdownSection>
                            <DropdownItem key="edit" textValue="Edit Chapter" onClick={() => chapter.id && editChapter && editChapter(chapter.id)}>
                                <span className="flex flex-row">
                                    <FaRegEdit size={18} />
                                    <span className="ml-1">Editar Capitulo</span>
                                </span>
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            <DropdownItem key="delete" textValue="Delete Chapter" onClick={() => chapter.id && editChapter && editChapter(chapter.id)}>
                                <span className="flex flex-row">
                                    <MdOutlineDelete size={18} />
                                    <span className="ml-1">Eliminar Capitulo</span>
                                </span>
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}