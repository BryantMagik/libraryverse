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
import { BookSchema, GenreEnum } from "@/schemas"
import { Book, GenreEnumESP, statusLabels } from '@/app/types/typesModels'
import { editBooks } from "@/actions/edit-books"
import toast, { Toaster } from "react-hot-toast"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { CldUploadWidget } from 'next-cloudinary'
import { Card, CardHeader, CardBody, Image, Input, Button } from "@nextui-org/react"
import { Textarea } from "@nextui-org/input"
import { Select, SelectItem } from "@nextui-org/react"

interface BookFormUpdateProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
    onUpdate: (updatedBook: Book) => void
}

export const BookFormUpdate: React.FC<BookFormUpdateProps> = ({ book, onUpdate }) => {

    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const [resource, setResource] = useState(book?.coverImage || "")
    const genres = GenreEnum.options

    const form = useForm<z.infer<typeof BookSchema>>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            title: book?.title,
            description: book?.description,
            coverImage: book?.coverImage ?? "",
            genre: book?.genre || undefined,
            authorId: user.session?.id,
            status: book?.status,
        },
    })

    useEffect(() => {
        form.setValue('coverImage', resource)
    }, [resource, form])

    const onSubmit = (values: z.infer<typeof BookSchema>) => {

        startTransition(() => {
            editBooks(book.id ?? "", values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error)
                    }
                    if (data?.success) {
                        toast.success(data.success)
                        //@ts-ignore
                        onUpdate({ ...book, ...values })
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
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        type="hidden"
                                                        className="hidden"
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
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            defaultSelectedKeys={[field.value as string]}
                                            label="Género"
                                            id="genre"
                                            disabled={isPending}
                                        >
                                            {genres.map((genre) => (
                                                <SelectItem key={genre} value={genre}>
                                                    {GenreEnumESP[genre]}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-max mx-auto mt-4 text-white bg-library-500 hover:bg-library-600 active:bg-almond-700"
                        >
                            Guardar Cambios
                        </Button>

                        <Toaster />
                    </div>
                </div>
            </form>
        </Form>
    )
}