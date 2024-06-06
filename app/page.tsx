"use client";

import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";
import Loading from "@/components/home/loading-homepage";
import NavbarHome from "@/components/home/navbar-homepage";
import Image from "next/image";
import { useState } from "react";
import { Vibes } from "next/font/google";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const sourceFont = Vibes({
  subsets: ["latin"],
  weight: ["400"],
})

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Loading onLoadingComplete={() => setLoadingComplete(true)} />
        {loadingComplete && (
          <>
            <NavbarHome />
            <div className="flex flex-col md:flex-row w-full h-full bg-library-50 justify-center items-center">
              <div className="flex flex-col justify-center items-center align-middle m-4 md:m-20">
                <CardContainer className="inter-var">
                  <CardBody className="bg-library-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:w-[30rem] h-auto rounded-xl p-6">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      <h1 className="text-center text-library-500 text-3xl p-4 font-semibold">
                        Hola, Bienvenido a LibraryVerse.
                      </h1>
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <Image
                        src="/dashboard/back1.png"
                        height="1000"
                        width="1000"
                        className="w-full object-cover mx-auto"
                        alt="libraryverse"
                        priority
                      />
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      className="text-lg text-neutral-700 dark:text-white"
                    >
                      <h3 className="text-center text-library-600 font-semibold">
                        La comunidad narrativa más prometedora del mundo.
                      </h3>
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="20"
                      className="text-lg text-neutral-700 dark:text-white"
                    >
                      <p className="w-full md:w-[500px] text-justify mb-6">
                        Invitamos a una nueva generación de narradores y
                        fanáticos a unirse a nosotros, descubriendo y
                        compartiendo historias originales que cautivan e
                        inspiran. Tu voz y creatividad son bienvenidas aquí.
                        ¡Dale una oportunidad y sé parte de nuestra humilde y
                        emocionante comunidad en desarrollo!
                      </p>
                    </CardItem>
                    <CardItem
                      translateZ="20"
                      className="text-lg text-neutral-700 dark:text-white"
                    >
                      <AuthButton mode="modal" formType="register" asChild>
                        <Button className="text-white bg-library-500 hover:bg-library-700 hover:text-white" size="lg">
                          ¡Registrate ya!
                        </Button>
                      </AuthButton>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center w-auto md:w-full">
                <Image
                  className="relative mb-6 lg:mb-0 sm:absolute sm:max-w-xs md:relative lg:relative hidden md:block lg:block"
                  src="/home/h1-img-01.png"
                  width={390}
                  height={315}
                  alt="libraryverse"
                  priority
                />
                <Image
                  className="relative lg:right-9 z-10 lg:bottom-6 lg:h-[336px] mb-6 md:block lg:block hidden"
                  src="/home/h1-img-02.png"
                  width={230}
                  height={319}
                  alt="libraryverse"
                  priority
                />
                <Image
                  className="relative lg:right-60 z-1 mb-6 lg:mb-0 md:block lg:block hidden h-max"
                  src="/home/h1-img-03.png"
                  width={390}
                  height={317}
                  alt="libraryverse"
                  priority
                />
              </div>
            </div>
            <footer className="py-6 md:px-8 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  LibraryVerse es un proyecto de Bryan Edward. El código del proyecto está disponible en{" "}
                  <a
                    href="https://github.com/BryantMagik/libraryverse"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>.
                </p>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
}
