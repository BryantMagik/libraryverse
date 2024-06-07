import { Button } from "@nextui-org/button"
import { AuthButton } from "../auth/auth-button"
import { FlipWords } from "../ui/flip-words"
import Image from "next/image"
const words = ["Arte", "Progreso", "LibraryVerse"]


export default function Main() {
    return (
        <>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 mt-11">
                <div className="">
                    <h1 className="text-4xl font-bold mb-6">Hola!, somos <FlipWords words={words} /></h1>
                    <h2 className="text-3xl font-mono mb-4 ">Lo que siempre estabas buscando</h2>
                    <p className="text-lg mb-12">Libraryverse está comenzando su viaje para convertirse en el hogar de millones de personas que pasarán miles de millones de minutos al mes enganchadas a historias originales. Nuestra plataforma se dedica a democratizar la narrativa para una nueva generación de diversos escritores de la Generación Z y sus fans.</p>
                    <AuthButton mode="modal" formType="register" asChild>
                        <Button className="text-white bg-library-500 hover:bg-library-700 hover:text-white" size="lg">
                            ¡Registrate ya!
                        </Button>
                    </AuthButton>
                </div>
                <div className="flex justify-center items-center">
                    <Image alt='Homepage' width={400} height={400} src='/dashboard/bookDash.webp'/>
                </div>
            </div>
        </>
    )
}