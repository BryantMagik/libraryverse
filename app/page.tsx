"use client"

import { useState, useEffect } from "react"
import Loading from "@/components/home/loading-homepage"
import NavbarHome from "@/components/home/navbar-homepage"
import { Vibes } from "next/font/google"
import Footer from "@/components/footer/Footer"
import Main from "@/components/home/main-page"
import Section from "@/components/home/section"
import { useRouter } from "next/navigation"

const sourceFont = Vibes({
  subsets: ["latin"],
  weight: ["400"],
})

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (loadingComplete) {
      router.push('/dashboard')
    }
  }, [loadingComplete, router])

  return (
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
  )
}
