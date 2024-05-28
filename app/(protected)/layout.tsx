import NavbarApp from "./_componets/navbarApp"
import SideNav from "./_componets/sideNav"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"


interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {

    const session = await auth()

    return (
        <SessionProvider session={session}>
            <NavbarApp />
            <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
                <div className='w-full flex-none md:w-64'>
                    <SideNav />
                </div>
                <div className='flex-grow p-6 md:overflow-y-auto md:p-12 no-scrollbar'>{children}</div>
            </div>
        </SessionProvider>

    )

}

export default ProtectedLayout