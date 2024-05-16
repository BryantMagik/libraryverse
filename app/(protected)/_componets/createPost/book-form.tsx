"use client"

import { BookSchema, GenreEnum } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useState, useTransition } from "react";
import { postBook } from "@/actions/post-books";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectScrollUpButton, SelectItem, SelectScrollDownButton } from "@/components/ui/select";
import { CldUploadWidget } from 'next-cloudinary';

export const BookForm = () => {
    const user = useCurrentUser();
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [previewImage, setPreviewImage] = useState<string | undefined>("")
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



    const onSubmit = (values: z.infer<typeof BookSchema>) => {
        console.log(values)
        setError("");
        setSuccess("");

        startTransition(() => {
            console.log("Form values:", values)
            postBook(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }
                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                        router.refresh()
                    }
                })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <h1 className="font-semibold">Historia sin título</h1>
                    </div>
                </div>
                <h2 className="font-bold border-almond-300 border-b-4">
                    Detalles de la historia
                </h2>
                <div className="flex flex-col space-y-4 p-2">
                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <CldUploadWidget
                                signatureEndpoint="/api/cloudinary"
                                onSuccess={(result, { widget }) => {
                                    widget.close()
                                    //@ts-ignore
                                    setResource(result?.info.secure_url)

                                }}
                                options={{ maxFiles: 1 }}
                            >
                                {({ open }) => {

                                    <FormItem>
                                        <FormLabel className="text-2xl">Portada del libro</FormLabel>
                                        <div className="relative cursor-pointer hover:opacity-70 transition p-10
                                                                    border-neutral-300 flex flex-col justify-center items-center gap-4
                                                                    text-neutral-600 bg-slate-100"
                                            onClick={() => open()}
                                        >
                                            <p className="text-lg font-semibold">Agregar Imagen</p>
                                            {resource && (
                                                <div className="absolute inset-0 w-full h-full">
                                                    <Image
                                                        fill
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
                                    </FormItem>

                                }}

                            </CldUploadWidget>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-2xl">Título</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Historia sin título"
                                        type="text"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-2xl">
                                    Descripción
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={isPending}
                                        className="min-h-[200px]"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-2xl">Género</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isPending}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un genero" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectScrollUpButton />
                                            <SelectGroup>
                                                {GenreEnum.options.map((genre) => (
                                                    <SelectItem key={genre} value={genre}>
                                                        {genre}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                            <SelectScrollDownButton />
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage>{form.formState.errors.genre?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full text-white bg-almond-500 hover:bg-almond-600 active:bg-almond-700"
                >
                    Crear libro
                </Button>
            </form>
        </Form>
    )
}

