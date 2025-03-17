"use client"

import { useState, useEffect } from "react"
import Loading from "@/components/home/loading-homepage"
import { useRouter } from "next/navigation"

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
        </>
      )}
    </div>
  )
}
