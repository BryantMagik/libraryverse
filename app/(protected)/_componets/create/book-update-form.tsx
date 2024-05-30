"use client"

import React, { useState, useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { useCurrentUser } from "@/hook/use-current-user"
import { useParams, useRouter } from "next/navigation"
import { BookSchema } from "@/schemas"
import { Book, GenreEnumESP, statusLabels } from '@/app/types/typesModels'
import { editBooks } from "@/actions/edit-books"
import toast from "react-hot-toast"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { CldUploadWidget } from 'next-cloudinary'
import { Card, CardHeader, CardBody, Image, Input } from "@nextui-org/react"
import {Textarea} from "@nextui-org/input"

interface BookFormUpdateProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
}

export const BookFormUpdate: React.FC<BookFormUpdateProps> = ({ book }) => {

    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [resource, setResource] = useState(book?.coverImage || "")

    const router = useRouter()
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id

    const form = useForm<z.infer<typeof BookSchema>>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            title: book?.title,
            description: book?.description,
            coverImage: book?.coverImage ?? "",
            authorId: user.session?.id,
            status: book?.status,
        },
    })

    useEffect(() => {
        form.setValue('coverImage', resource)
    }, [resource, form])

    const onSubmit = (values: z.infer<typeof BookSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            editBooks(bookId, values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error)
                        setError(data.error)
                    }
                    if (data?.success) {
                        toast.success(data.success)
                        setSuccess(data.success)
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
                <h2 className="text-2xl leading-9 font-semibold text-custom-gray border-almond-300 border-b-4
                    dark:text-emerald-600 dark:border-emerald-400"
                >
                    Edita tu Libro
                </h2>
                <p className="text-sm text-muted-foreground dark:text-white">
                    Completa los campos para editar el libro
                </p>
                <Separator />
                <div className="grid md:grid-cols-2 space-y-4 p-2 grid-cols-1 gap-10">
                    <div>
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <CldUploadWidget
                                    options={{
                                        sources: ['local', 'url'],
                                        maxImageFileSize: 1500000,
                                        maxFiles: 1,
                                        clientAllowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
                                        minImageWidth: 250,
                                        minImageHeight: 333,
                                        maxImageHeight: 3000,
                                        maxImageWidth: 2000,
                                        thumbnailTransformation: [{ width: 250, height: 333, crop: 'fill' }],
                                    }}
                                    signatureEndpoint="/api/cloudinary"
                                    onSuccess={(result, { widget }) => {
                                        //@ts-ignore
                                        setResource(result?.info.secure_url)
                                        widget.close()
                                    }}
                                >
                                    {({ open }) => (
                                        <>
                                            <FormItem className="mb-2">
                                                <div
                                                    className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100
                                                    h-[300px] w-[200px] mx-auto text-center
                                                    "
                                                    onClick={() => open()}
                                                >
                                                    <p className="text-lg font-light text-custom-gray">Cambiar portada</p>
                                                    <div className="absolute inset-0 w-full h-full">
                                                        {resource && (
                                                            <div className="absolute inset-0 w-full h-full">
                                                                <Image
                                                                    style={{ objectFit: 'contain' }}
                                                                    src={resource}
                                                                    alt="Portada del Libro"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        type="hidden"
                                                        name="coverImage"
                                                        value={resource}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                </CldUploadWidget>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            label="Título"
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            id="title"
                                            placeholder="Titulo de la historia"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            label="Descripción"
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            id="description"
                                            placeholder="Descripción de la historia"
                                        />
                                        
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

            </form>
        </Form>
    )
}