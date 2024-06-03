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
import { BookForm } from "./book-form"

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
        <BookForm
            title="Editar libro"
            subtitle="Edita los datos de tu libro"
            buttonAction="Actualizar"
            form={form}
            onSubmit={onSubmit}
            isPending={isPending}
            resource={resource}
            setResource={setResource}
        />
    )
}