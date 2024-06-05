import { Chapter } from "@/app/types/typesModels"
import { Button, Switch } from "@nextui-org/react"
import { BsBookHalf } from "react-icons/bs"
import { ChapterUserStatus } from "@prisma/client"
import { Chip } from "@nextui-org/chip"
import { useEffect, useState } from "react"
import { getStatusChapter } from "@/actions/getStatusChapter"
import { CiCircleCheck } from "react-icons/ci"
import { MdOutlineRadioButtonUnchecked } from "react-icons/md"
interface HistoryArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter: Partial<Chapter>
    readChapter?: (chapterId: string) => void
    updateChapterStatus?: (chapterId: string, status: ChapterUserStatus) => void
}

export const HistoryArtTableAll: React.FC<HistoryArtTableProps> = ({
    chapter,
    readChapter,
    updateChapterStatus
}) => {
    const [readStatus, setReadStatus] = useState<ChapterUserStatus | null>(null)
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false)

    useEffect(() => {
        getStatusChapter(chapter.id ?? '')
            .then((status) => {
                setReadStatus(status)
            }).catch(error => {
                console.error("Error en server actions de getStatusChapter:", error)
            })

    }, [chapter])

    const toggleReadStatus = () => {
        setLoadingStatus(true) 
        const newStatus = readStatus === 'READ' ? 'UNREAD' : 'READ'

        if (updateChapterStatus) {
            updateChapterStatus(chapter.id || '', newStatus)
            setReadStatus(newStatus)
            setLoadingStatus(false)
        } 
    }
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
            <div className="flex-1 content-center items-start">
                {readStatus === "READ" ? <Chip color="success" size="sm">
                    Leido
                </Chip> : <Chip color="danger" size="sm">
                    No leido
                </Chip>}
            </div>
            <Button
                    size="sm"
                    onClick={toggleReadStatus}
                    disabled={loadingStatus}
                    className="relative w-[20px] hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-0 h-8 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                    {loadingStatus ? "Cargando..." : (readStatus === 'READ' ? <CiCircleCheck size={20}/> : <MdOutlineRadioButtonUnchecked size={20}/>)}
                </Button>
            <div className="flex flex-col items-center">
                <Button
                    size="sm"
                    onClick={() => chapter.id && readChapter && readChapter(chapter.id)}
                    aria-label="Options" className="relative w-[20px] rouded hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-0 h-8 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                    <BsBookHalf size={18} />
                </Button>
            </div>
        </div>
    )
}

