"use client"

import { BookSchema, GenreEnum } from "@/schemas"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hook/use-current-user"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { CldUploadWidget } from 'next-cloudinary'
import { HiMiniPhoto } from "react-icons/hi2"
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import { GenreEnumESP } from "@/app/types/typesModels"
import toast, { Toaster } from "react-hot-toast"
import { createBook } from "@/actions/create-books"
import { Separator } from "@radix-ui/react-dropdown-menu"

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
                        router.refresh()
                    }
                })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <h2 className="text-2xl leading-9 font-semibold text-custom-gray border-almond-300 border-b-4
                    dark:text-emerald-600 dark:border-emerald-400"
                >
                    Detalles de la Historia
                </h2>
                <p className="text-sm text-muted-foreground dark:text-white">
                    Completa los campos para crear una nueva historia
                </p>
                <Separator />
                <div className="grid md:grid-cols-2 space-y-4 p-2 grid-cols-1">
                    <div className="">
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <CldUploadWidget
                                    options={{
                                        sources: ['local', 'url'],
                                        maxImageFileSize: 1500000,
                                        maxFiles: 1,
                                        clientAllowedFormats: ['jpeg', 'png', 'jpg','webp'],
                                        minImageWidth: 250,
                                        minImageHeight: 333,
                                        maxImageHeight: 3000,
                                        maxImageWidth: 2000,
                                        thumbnailTransformation	: [{ width: 250, height: 333, crop: 'fill'}],
                                    }}
                                    signatureEndpoint="/api/cloudinary"
                                    onSuccess={(result, { widget }) => {
                                        //@ts-ignore
                                        setResource(result?.info.secure_url)
                                        widget.close()
                                    }}
                                >
                                    {({ open }) => (
                                        <FormItem className="mb-2">
                                            <div
                                                className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100
                                                h-[300px] w-[200px] mx-auto text-center
                                                "
                                                onClick={() => open()}
                                            >
                                                <HiMiniPhoto size={80} />
                                                <p className="text-lg font-light text-custom-gray">Añadir una portada</p>
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
                                                    name="coverImage"
                                                    value={resource}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                </CldUploadWidget>
                            )}
                        />

                    </div>
                    <div className="">
                        <Card className="py-4">
                            <CardBody className="overflow-visible py-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-2xl font-medium text-library-400 border-almond-300 border-b-2">Título</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Historia sin título"
                                                    type="text"
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
                                            <FormLabel className="text-2xl font-medium text-library-400">
                                                Descripción
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    disabled={isPending}
                                                    className="min-h-10 max-h-20"
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
                                            <FormLabel className="text-2xl font-medium text-library-400">Género</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    disabled={isPending}
                                                >
                                                    <SelectTrigger className="w-[280px]">
                                                        <SelectValue placeholder="Selecciona un genero" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup >
                                                            {GenreEnum.options.map((genre) => (
                                                                <SelectItem key={genre} value={genre}>
                                                                    {GenreEnumESP[genre]}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.genre?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className="w-max mx-auto mt-4 text-white bg-library-500 hover:bg-library-600 active:bg-almond-700"
                                >
                                    Crear libro
                                </Button>
                                <Toaster />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
