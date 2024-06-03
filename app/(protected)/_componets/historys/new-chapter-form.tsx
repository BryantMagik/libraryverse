"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter } from "@/app/types/typesModels"
import { Button } from "@nextui-org/button"
import { ChapterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useTransition } from "react"
import toast, { Toaster } from "react-hot-toast"
import Tiptap from "./Tiptap"
import { createChapter } from "@/actions/create-chapter"
import { useCurrentUser } from "@/hook/use-current-user"

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
            createChapter(bookIdfetch,values)
                .then((data) => {
                    if(data?.error) {
                        toast.error(data.error)
                    }
                    if(data?.success) {
                        toast.success(data.success)
                    }
                })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="grid space-y-4 p-2 grid-cols-1 gap-10">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="border-b-1 border-b-custom-gray">
                                <FormControl>
                                    <input
                                        {...field}
                                        name="title"
                                        disabled={isPending}
                                        placeholder="Título del capítulo"
                                        required
                                        id="title"
                                        className="w-full text-center text-4xl hover:outline-none active:outline-none focus:outline-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Tiptap description={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                            <FormItem className="border-b-1 border-b-custom-gray">
                                <FormControl>
                                    <input
                                        {...field}
                                        name="order"
                                        type="number"
                                        disabled={isPending}
                                        placeholder="Orden del capítulo"
                                        required
                                        id="order"
                                        className="w-full text-center text-4xl hover:outline-none active:outline-none focus:outline-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-max mx-auto mt-4 text-white bg-library-500 hover:bg-library-600 active:bg-almond-700"
                    >
                        Crear capítulo
                    </Button>
                    <Toaster />
                </div>
            </form>
        </Form>
    )
}