"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter } from "@/app/types/typesModels"
import { ChapterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import toast from "react-hot-toast"
import { createChapter } from "@/actions/create-chapter"
import { useCurrentUser } from "@/hook/use-current-user"
import { ChapterForm } from "./chapter-form"

interface NewChapterProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter?: Partial<Chapter>
    bookIdfetch: string
}

export const NewChapterForm: React.FC<NewChapterProps> = ({ bookIdfetch }) => {

    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ChapterSchema>>({
        resolver: zodResolver(ChapterSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
            bookId: bookIdfetch,
            userId: user.session?.id,
            order: "",
            status: "DRAFT",
        },
    })

    const onSubmit = (values: z.infer<typeof ChapterSchema>) => {

        startTransition(() => {
            createChapter(bookIdfetch, values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error)
                    }
                    if (data?.success) {
                        toast.success(data.success)
                        form.reset()
                    }
                })
        })
    }

    return (
        <ChapterForm
            form={form}
            bookIdfetch={bookIdfetch}
            onSubmit={onSubmit}
            isPending={isPending}
            buttonLabel="Crear capítulo"
        />
    )
}