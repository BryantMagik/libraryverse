"use client"

import React, { useTransition } from "react"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Toaster, toast } from "sonner"
import { SettingsSchema } from "@/schemas"
import { settings } from "@/actions/settings"
import { useCurrentUser } from "@/hook/use-current-user"
import { useSession } from "next-auth/react"

export const SettingsMainpanel = () => {

    const [isPending, startTransition] = useTransition()
    const user = useCurrentUser()
    const dateToday = new Date()
    const { update } = useSession()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user.session?.name || undefined,
            email: user.session?.email || undefined,
            password: undefined,
            newPassword: undefined,
            isTwoFactorEnabled: user.session?.twoFactorAuth || undefined,
        },
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values).then((data) => {
                if (data?.success) {
                    update()
                    toast.success(data.success, {
                        description: `${dateToday.toDateString()}`
                    })
                }
                if (data?.error) {
                    toast.error(data.error, {
                        description: `${dateToday.toDateString()}`
                    })
                }
                if (data?.info) {
                    toast.info(data.info, {
                        description: `${dateToday.toDateString()}`
                    })
                }
            })
        })
        update()
    }
    return (
        <div id="#start" className="overflow pl-4">
            <div className="mb-2">
                <h1 className="text-2xl font-bold">Ajustes de Cuenta</h1>
                <p className="text-muted-foreground text-xs">
                    Cambiar mensaje para produccion
                </p>
            </div>
            <Separator className="dark:bg-slate-800 bg-gray-300" />
            <Toaster />
            <div className="my-3">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            {/* Datos de usuario */}
                            <h2 className="mb-3 font-semibold text-gray-500">Cuenta de usuario</h2>
                            <div className=" flex flex-row gap-5 mb-5">
                                <div className="flex flex-col gap-5">
                                    {/* Nombre */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="text-xs w-[400px]">
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="dark:border-slate-800 w-full"
                                                        {...field}
                                                        placeholder="Bry Magik"
                                                        disabled={isPending}
                                                        type="text"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email */}
                                    {user.session?.isOAuth === false && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className="text-xs w-[400px]">
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="dark:border-slate-800 w-full"
                                                                {...field}
                                                                placeholder="BryMagik@gmail.com"
                                                                disabled={isPending}
                                                                type="email"
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <Separator className="dark:bg-slate-800 bg-gray-300 " />

                            {user.session?.isOAuth === false && (
                                <>
                                    {/* Seguridad */}
                                    <h2 className="mb-3 font-semibold text-gray-500">
                                        Seguridad y privacidad
                                    </h2>
                                    <div className="flex flex-row gap-5 mb-5">
                                        <div className="flex flex-col gap-5">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem className="text-xs w-[400px]">
                                                        <FormLabel>Contraseña Anterior</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="dark:border-slate-800 w-full"
                                                                type="password"
                                                                {...field}
                                                                placeholder="Contraseña anterior"
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="newPassword"
                                                render={({ field }) => (
                                                    <FormItem className="text-xs w-[400px]">
                                                        <FormLabel>Nueva Contraseña</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="dark:border-slate-800 w-full"
                                                                type="password"
                                                                {...field}
                                                                placeholder="Nueva contraseña"
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="isTwoFactorEnabled"
                                            render={({ field }) => (
                                                <FormItem className="text-xs w-[400px] ">
                                                    <FormLabel>Autenticación de dos factores</FormLabel>
                                                    <div className="flex-between items-center">
                                                        <FormDescription className="pt-3">
                                                            Habilitar la autenticación de dos factores para tu cuenta
                                                        </FormDescription>
                                                        <FormControl>
                                                            <Switch
                                                                className="mt-3"
                                                                disabled={isPending}
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Separator className="dark:bg-slate-800 bg-gray-300 " />
                                </>
                            )}
                        </div>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="variant_btn select-none"
                        >
                            Guardar Cambios
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};