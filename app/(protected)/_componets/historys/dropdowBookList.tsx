import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Book } from "@/app/types/typesModels"
import { ChaptersAll } from "./chapters-all"
import { Image } from "@nextui-org/react"

interface DropdownMenuChaptersProps extends React.HTMLAttributes<HTMLDivElement> {
    chapterId: string
    book: Partial<Book>
}


export const DropdownMenuChapters: React.FC<DropdownMenuChaptersProps> = ({ chapterId, book }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-none w-auto h-[60px] flex items-start dark:bg-emerald-500 bg-library-500 hover:bg-library-700 dark:hover:bg-emerald-700 dark:text-white">
                    <Image className="w-[28px] h-[43px] rounded-none" width={30} height={200} src={book.coverImage || ""} alt={book.title} />
                    <span className="flex flex-col items-start">
                        <span className="text-left text-[10px] pl-2">{book.title}</span>
                        <span className="text-left text-[10px] pl-2">{book.author?.name}</span>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup >
                    <DropdownMenuLabel>Capítulos de {book.title}</DropdownMenuLabel>
                    <ChaptersAll />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}