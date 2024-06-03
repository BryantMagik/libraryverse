import { Chapter } from "@/app/types/typesModels"
import { Button } from "@nextui-org/react"
import { FaRegEdit } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"

interface HistoryArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter: Partial<Chapter>
    editChapter?: (chapterId: string) => void
    removeChapter: (chapterId: string) => void
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
                <h3 className="font-medium leading-none text-black dark:text-emerald-400 p-2">
                    Capitulo {chapter.order}:
                </h3>
            </div>
            <h3 className="flex-1 content-center font-medium leading-none italic text-library-500 dark:text-emerald-400 hover:underline p-2">
                {chapter.title}
            </h3>
            <div className="flex flex-col place-content-center space-y-1">
                <Button size='sm'
                    onClick={() => chapter.id && editChapter && editChapter(chapter.id)}
                    className="border border-input bg-transparent hover:bg-library-500 hover:text-white dark:bg-emerald-600 dark:hover:bg-emerald-300">
                    <FaRegEdit size={13} />
                </Button>
                <Button size='sm'
                    onClick={() => chapter.id && removeChapter(chapter.id)}
                    className="border border-input bg-transparent hover:bg-library-500 hover:text-white dark:bg-emerald-600 dark:hover:bg-emerald-300">
                    <MdOutlineDelete size={15} />
                </Button>
            </div>
        </div>
    )
}