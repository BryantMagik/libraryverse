import { Chapter } from "@/app/types/typesModels"
import { Button, Link, Switch } from "@nextui-org/react"
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
        <div className="flex flex-col">
            <div className="flex flex-row md:space-x-2 space-x-1 ">
                <h3 className="font-medium hover:default place-self-center leading-none text-black dark:text-emerald-400 p-0">
                    <span className="hidden md:inline">Capitulo:</span><span>{chapter.order}</span>
                </h3>
                <h3 className="grow hover:cursor-pointer font-medium place-content-center mx-auto leading-none italic text-black dark:text-emerald-400">
                    <Link className="" onClick={() => chapter.id && readChapter && readChapter(chapter.id)}>
                        {chapter.title}</Link>
                </h3>
                {readStatus === "READ" ? <Chip className="hidden md:inline" color="success" size="sm">
                    Leido
                </Chip> : <Chip className="hidden md:inline" color="danger" size="sm">
                    No leido
                </Chip>}
                <Button
                    size="sm"
                    onClick={toggleReadStatus}
                    disabled={loadingStatus}
                    className="relative hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-0 h-8 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                    {loadingStatus ? "Cargando..." : (readStatus === 'READ' ? <CiCircleCheck size={20} /> : <MdOutlineRadioButtonUnchecked size={20} />)}
                </Button>
                <Button
                    size="sm"
                    onClick={() => chapter.id && readChapter && readChapter(chapter.id)}
                    aria-label="Options" className="relative rouded hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-0 h-8 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                    <BsBookHalf size={18} />
                </Button>
            </div>
        </div>
    )
}

