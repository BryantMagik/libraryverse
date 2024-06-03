"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter } from "@/app/types/typesModels"
import { ChapterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import toast from "react-hot-toast"
import { useCurrentUser } from "@/hook/use-current-user"
import { ChapterForm } from "./chapter-form"
import { editChapter } from "@/actions/edit-chapter"

interface UpdateChapterProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter: Partial<Chapter>
    chapterId: string
}

export const UpdateChapterForm: React.FC<UpdateChapterProps> = ({ chapter, chapterId }) => {

    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ChapterSchema>>({
        resolver: zodResolver(ChapterSchema),
        defaultValues: {
            title: chapter.title,
            content: chapter.content,
            bookId: chapter.id,
            userId: user.session?.id,
            order: chapter.order,
            status: chapter.status,
        },
    })

    const onSubmit = (values: z.infer<typeof ChapterSchema>) => {

        startTransition(() => {
            editChapter(chapter?.id ?? "", values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error)
                    }
                    if (data?.success) {
                        toast.success(data.success)
                        //@ts-ignore
                    }
                })
        })
    }

    return(
        <ChapterForm 
            form={form}
            bookIdfetch={chapterId}
            onSubmit={onSubmit}
            isPending={isPending}
            buttonLabel="Actualizar capítulo"
        />
    )
}