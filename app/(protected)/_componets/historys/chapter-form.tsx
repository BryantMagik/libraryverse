"use client"

import { Button } from "@nextui-org/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Toaster } from "react-hot-toast"
import Tiptap from "./Tiptap"


interface ChapterFormProps extends React.HTMLAttributes<HTMLDivElement> {
    form: any,
    bookIdfetch: string
    onSubmit: (values: any) => void,
    isPending: boolean,
    buttonLabel?: string
}


export const ChapterForm: React.FC<ChapterFormProps> = ({
    form,
    resource,
    onSubmit,
    isPending,
    buttonLabel,
}) => {

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
                        {buttonLabel}
                    </Button>
                </div>
            </form>
        </Form>
    )
}