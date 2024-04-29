import { LoginButton } from "@/components/auth/login-button";
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { RegisterButton } from "@/components/auth/register-button";
import { AuthButton } from "@/components/auth/auth-button";
import Loading from "@/components/home/loading-page";
//todo//
export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-sky-950">
      {/* <Image className="relative" src={"/home/home1.webp"} alt={""}
        width={1200}
        height={800}
      /> */}
      <Loading />

      <LoginButton mode="modal" asChild>
        <Button variant="secondary" size="lg">
          Iniciar Sesión
        </Button>
      </LoginButton>

      <RegisterButton mode="modal" asChild>
        <Button variant="secondary" size="lg">
          Registrarse
        </Button>
      </RegisterButton>

      {/* <AuthButton mode="modal" formType={"login"} asChild >
        <Button variant="secondary" size="lg">Inciar Sesión</Button>
      </AuthButton> */}
    </main>
  )
}
