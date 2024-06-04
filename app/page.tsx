"use client"

import { AuthButton } from "@/components/auth/auth-button"
import { Button } from "@/components/ui/button"
import Loading from "@/components/home/loading-homepage"
import NavbarHome from "@/components/home/navbar-homepage"
import Image from "next/image"
import { useState } from "react"
import { Vibes } from "next/font/google"

const sourceFont = Vibes({
  subsets: ['latin'],
  weight: ['400']
})
export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  return (
      <div className="flex flex-col min-h-screen">
        <Loading onLoadingComplete={() => setLoadingComplete(true)} />
        {loadingComplete && (
          <>
            <NavbarHome />
            <div className="flex flex-row w-full h-full bg-almond-50 justify-center items-center">
              <div className="flex flex-col justify-center items-center align-middle m-20">
                <h1 className="text-left text-almond-500 text-3xl p-4 font-semibold">Hola, Bienvenido a LibraryVerse. Preview site! </h1>
                <h3 className="text-center text-almond-600 p-2 font-semibold">La comunidad narrativa más prometedora del mundo.</h3>
                <p className="w-[370px] text-justify mb-6">
                  Invitamos a una nueva generación de narradores y fanáticos a unirse a nosotros,
                  descubriendo y compartiendo historias originales que cautivan e inspiran.
                  Tu voz y creatividad son bienvenidas aquí. ¡Dale una oportunidad y
                  sé parte de nuestra humilde y emocionante comunidad en desarrollo!</p>
                <AuthButton mode="modal" formType="login" asChild>
                  <Button className="bg-white outline outline-1 rounded-none text-almond-500 outline-almond-500 hover:bg-almond-700 hover:text-white " size="lg">
                    Iniciar Sesión
                  </Button>
                </AuthButton>
                <h1 className={sourceFont.className + "text-center p-4 text-almond-500 text-3xl italic"}>O</h1>
                <AuthButton mode="modal" formType="register" asChild>
                  <Button className="bg-white outline outline-1 rounded-none text-almond-500 outline-almond-500 hover:bg-almond-700 hover:text-white" size="lg">
                    Registro
                  </Button>
                </AuthButton>
              </div>
              <div className="flex flex-row justify-center items-center w-auto">
                <Image
                  className="relative mb-6 lg:mb-0 md:top-0 sm:absolute sm:max-w-xs md:relative lg:relative"
                  src="/home/h1-img-01.png"
                  width={390}
                  height={315}
                  alt="libraryverse"
                  priority
                />
                <Image
                  className="relative lg:right-9 z-10 lg:bottom-6 lg:h-[336px] md:bottom-6 mb-6 md:block lg:block hidden"
                  src="/home/h1-img-02.png"
                  width={230}
                  height={319}
                  alt="libraryverse"
                  priority
                />
                <Image
                  className="relative lg:right-60 z-1 mb-6 lg:mb-0 md:block md:right-60 lg:block hidden h-max"
                  src="/home/h1-img-03.png"
                  width={390}
                  height={317}
                  alt="libraryverse"
                  priority
                />
              </div>
            </div>
          </>
        )}
      </div>
  )
}
