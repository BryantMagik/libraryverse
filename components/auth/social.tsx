"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { Button } from "@nextui-org/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"

export const Social = () => {
    const searchParams = useSearchParams()
    const calbackUrl = searchParams.get("callbackUrl")


    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: calbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 py-2">
                <hr className="bg-divider h-divider w-full" role="separator" />
                <p className="text-tiny text-default-500">O</p>
                <hr className="bg-divider h-divider w-full" role="separator" />
            </div>
            <div className='flex flex-col items-center w-full py-2 gap-y-2'>
                <Button
                    size="lg"
                    className="w-full hover:bg-library-400 hover:text-white bg-library-200 text-black"
                    variant="shadow"
                    onClick={() => onClick("github")}
                >
                    <FaGithub className="h-5 w-5" />
                    Continuar con GitHub
                </Button >
                <Button
                    size="lg"
                    variant="shadow"
                    className="w-full hover:bg-library-400 hover:text-white bg-library-200 text-black"
                    onClick={() => onClick("google")}
                >
                    <FcGoogle className="h-5 w-5" />
                    Continuar con Google

                </Button >
            </div >
        </div>
    )
}