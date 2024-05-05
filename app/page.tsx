"use client"
import Loading from "@/components/home/loading-homepage"
import NavbarHome from '@/components/home/navbar-homepage'
import Image from 'next/image'
import { useState } from "react"
export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div >
      <Loading onLoadingComplete={() => setLoadingComplete(true)} />
      {loadingComplete &&
        <div>
          <NavbarHome />
          {/* <Image className="relative" src={"/home/home1.webp"} alt={""}
            width={1200}
            height={800}
          /> */}
        </div>
      }

    </div>
  )
}
