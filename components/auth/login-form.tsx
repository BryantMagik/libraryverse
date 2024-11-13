"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useTransition } from "react"
import { LoginSchema } from "@/schemas"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input } from "@nextui-org/react"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PiEye } from "react-icons/pi"
import { PiEyeClosed } from "react-icons/pi"

export const LoginForm = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const urlError = searchParams.get("error") ===
        "OAuthAccountNotLinked"
        ? "El correo electrónico ya está en uso con otro proveedor!"
        : ""
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data?.error)
                    }
                    if (data?.success) {
                        form.reset()
                        setSuccess(data?.success)
                    }
                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => setError("Algo ha ido mal."))
        })
    }

    const loginAsTestUser = () => {
        const testUser = {
            email: "testlibraryverse@gmail.com",
            password: "12345678",
        }
        form.setValue("email", testUser.email)
        form.setValue("password", testUser.password)
        onSubmit(testUser)
    }

    return (
        <CardWrapper
            headerLabel="Inicia sesión"
            backButtonLabel="¿Aún no tienes una cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código de verificación</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Ej: 123456"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    isRequired
                                                    variant="underlined"
                                                    label="Correo Electrónico"
                                                    {...field}
                                                    disabled={isPending}
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    variant="underlined"
                                                    label="Contraseña"
                                                    isRequired
                                                    {...field}
                                                    disabled={isPending}
                                                    endContent={
                                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                            {isVisible ? (
                                                                <PiEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                                                            ) : (
                                                                <PiEye className="text-2xl text-default-400 pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    type={isVisible ? "text" : "password"}
                                                />
                                            </FormControl>
                                            <Button
                                                size="sm"
                                                variant="link"
                                                asChild
                                                className="px-0 font-normal">
                                                <Link href="/auth/reset" className="text-almond-700">
                                                    ¿Has olvidado tu contraseña?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full text-white bg-library-500 hover:bg-library-600 active:bg-library-700"
                    >
                        Iniciar Sesión
                    </Button>
                    <Button
                        type="button"
                        onClick={loginAsTestUser}
                        className="w-full mt-4 text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
                    >
                        Iniciar Sesión como Usuario de Prueba
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}