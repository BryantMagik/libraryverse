"use client"

import Loading from "@/components/home/loading-homepage"
import NavbarHome from "@/components/home/navbar-homepage"
import { useState } from "react"
import { Vibes } from "next/font/google"
import Footer from "@/components/footer/Footer"
import Main from "@/components/home/main-page"
import Section from "@/components/home/section"

const sourceFont = Vibes({
  subsets: ["latin"],
  weight: ["400"],
})

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-screen radiant-background">
        <Loading onLoadingComplete={() => setLoadingComplete(true)} />
        {loadingComplete && (
          <>
            <NavbarHome />
            <Main />
            <Section />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
