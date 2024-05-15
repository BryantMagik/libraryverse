"use client"

import { BookSchema } from "@/schemas"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { startTransition, useState, useTransition } from "react"

export const BookForm = () => {

    const searchParams = useSearchParams()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof BookSchema>>({
        resolver: zodResolver(BookSchema),
        defaultValues: {

        }
    })

    const onSubmit = (values: z.infer<typeof BookSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            <></>
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <div><h1 className="font-semibold">Historia sin título</h1></div>
                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen de Portada</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending} 
                                        type="file" 
                                        onChange={(e) => field.onChange(e.target.files?.[0])} />
                                </FormControl>
                            </FormItem>

                        )}
                    >
                    </FormField>
                </div>
                <div className="space-y-4 border-1 p-4">
                    <h2 className="font-bold border-almond-300 border-b-4">Detalles de la historia</h2>
                    <div className="flex flex-col space-y-4 p-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-2xl ">Título</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="title" type="text" placeholder="Historia sin título" />
                                    </FormControl>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title" className="text-2xl ">Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} id="title" className="min-h-[200px]" />
                                    </FormControl>
                                </FormItem>
                            )}
                        >
                        </FormField>
                    </div>
                </div>
            </form>
        </Form>

    )
}
