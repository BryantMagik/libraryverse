import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { RegisterButton } from "@/components/auth/register-button";
import { AuthButton } from "@/components/auth/auth-button";
import Loading from "@/components/home/loading-homepage";
import NavbarHome from '@/components/home/navbar-homepage';
//todo//
export default function Home() {
  return (
    <div >
      {/* <Image className="relative" src={"/home/home1.webp"} alt={""}
        width={1200}
        height={800}
      /> */}
      {/* <Loading /> */}
      <NavbarHome />
    </div>
  )
}
