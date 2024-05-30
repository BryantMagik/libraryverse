import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LibraryVerse",
  description: "Explora nuevos mundos con nuestros libros",
  icons: {
    icon: "./favicon.ico"
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (

    <SessionProvider session={session}>
      <html lang="en" className="no-scrollbar bg-fondo">
        <body className={inter.className}>
          {children}</body>
      </html>
    </SessionProvider>
  )
}
