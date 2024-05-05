"use client"
import Loading from "@/components/home/loading-homepage";
import NavbarHome from '@/components/home/navbar-homepage';
import { useState } from "react";
//todo//
export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div >
      {/* <Image className="relative" src={"/home/home1.webp"} alt={""}
        width={1200}
        height={800}
      /> */}
      <Loading onLoadingComplete={() => setLoadingComplete(true)} />
      {loadingComplete && <NavbarHome />}
    </div>
  )
}
