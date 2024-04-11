"use client"

import { useEffect, useCallback, useState } from "react"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { newVerification } from "@/actions/new-verification"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("No hay token")
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Algo ha ido mal")
            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirmando verificacón"
            backButtonLabel="Vuelve al login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}