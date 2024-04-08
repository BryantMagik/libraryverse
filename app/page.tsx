import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Poppins } from "next/font/google";
import { Header } from "@/components/homepage/header"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <div>
      <Header label="" />
    </div>
    // <main className="flex h-screen flex-col
    // items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    //   <div className="space-y-6 text-center">
    //     <h1 className="text-6xl font-semibold text-white drop-shadow-md"></h1>
    //   </div>
    //   <div className='space-y-6 text-center'>
    //     <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",
    //       font.className,
    //     )}>LibraryVerse</h1>
    //     <p className="text-white text-lg">
    //       Descubre un mundo de conocimiento con LibraryVerse
    //     </p>
    //     <div>
    //       <LoginButton >
    //         <Button variant="secondary" size="lg">
    //           Sign in
    //         </Button>
    //       </LoginButton>
    //     </div>
    //   </div>
    // </main>
  );
}
