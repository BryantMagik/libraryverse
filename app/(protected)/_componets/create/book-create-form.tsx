"use client"

import { BookSchema } from "@/schemas"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hook/use-current-user"
import toast from "react-hot-toast"
import { createBook } from "@/actions/create-books"
import { BookForm } from "./book-form"
import { Loading } from "../loading/loading"

export const BookFormCreate = () => {
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const [resource, setResource] = useState("")

    const router = useRouter()

    const form = useForm<z.infer<typeof BookSchema>>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            title: "",
            description: "",
            coverImage: "",
            authorId: user.session?.id,
            status: "DRAFT"
        },
    })

    useEffect(() => {
        form.setValue('coverImage', resource)
    }, [resource, form])

    const onSubmit = (values: z.infer<typeof BookSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            createBook(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        toast.error(data.error)
                        setError(data.error)
                    }
                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                        toast.success(data.success)
                        router.push(`/historias/`)
                    }
                })
        })
    }

    return (
        <>
            {isPending && <Loading label="Cargando formulario de creación de libro" />}
            <BookForm
                title="Crear un nuevo libro"
                subtitle="Completa los campos para crear un nuevo libro"
                buttonAction="Crear"
                form={form}
                onSubmit={onSubmit}
                isPending={isPending}
                resource={resource}
                setResource={setResource}
            />
        </>
    )
}
