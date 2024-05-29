"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChapterSchema } from "@/schemas"
import { useRouter } from "next/router"
import { useEffect, useState, useTransition } from "react"
import { useCurrentUser } from "@/hook/use-current-user"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const ChapterForm = () => {

    const [isPending, startTransition] = useTransition()
    const [resource, setResource] = useState("")


    const form = useForm<z.infer<typeof ChapterSchema>>({
        resolver: zodResolver(ChapterSchema),
        defaultValues: {
            title: "",
            content: "",
            bookId: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ChapterSchema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <h2>
                    Crear un nuevo capítulo
                </h2>
                <div>
                    <FormItem>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Título</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            name="title"
                                            value={resource}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </FormItem>
                </div>
                <FormMessage />
            </form>
        </Form>
    )
}