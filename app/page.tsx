import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"

//todo//
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-950">
      <LoginButton mode="modal" asChild>
        <Button variant="secondary" size="lg">
          Iniciar Sesión
        </Button>
      </LoginButton>
    </main>
  )
}
