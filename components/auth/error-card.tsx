import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "@/components/auth/card-wrapper"

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Uy! algo ha ocurrido mal"
            backButtonHref="/auth/login"
            backButtonLabel="Vuelve a inicio"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}