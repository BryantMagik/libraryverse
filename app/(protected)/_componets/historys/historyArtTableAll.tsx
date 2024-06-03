import { Chapter } from "@/app/types/typesModels"
import { Button } from "@nextui-org/react"
import { BsBookHalf } from "react-icons/bs"
import { ChapterUserStatus } from "@prisma/client"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { getStatusChapter } from "@/actions/getStatusChapter"
import { read } from "fs"


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


    useEffect(() => {
        getStatusChapter(chapter.id ?? '')
            .then((status) => {
                setReadStatus(status)
            }).catch(error => {
                console.error("Error en server actions de getStatusChapter:", error)
            })
    }, [chapter])

    const toggleReadStatus = () => {

        const newStatus = readStatus === 'READ' ? 'UNREAD' : 'READ'

        if (updateChapterStatus) {
            updateChapterStatus(chapter.id || '', newStatus)
            setReadStatus(newStatus)
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
            <div className="place-content-center">
                {readStatus === 'READ' ? 'Leido' : 'No leido'}
            </div>
            <div className="place-content-center pr-1 md:pr-10">
                <Switch onClick={toggleReadStatus} checked={readStatus === 'READ'} aria-details={readStatus === 'READ' ? 'Leido' : 'No leido'}/>
            </div>
            <div className="flex flex-col place-content-center">
                <Button
                    onClick={() => chapter.id && readChapter && readChapter(chapter.id)}
                    aria-label="Options" className="hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-2 mb-2 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                    <BsBookHalf size={25} />
                </Button>
            </div>
        </div>
    )
}

