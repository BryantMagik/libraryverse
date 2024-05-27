"use client"
import NavbarApp from "./_componets/navbarApp"
import SideNav from "./_componets/sideNav"


interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {

    return (
        <>
            <NavbarApp />
            <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
                <div className='w-full flex-none md:w-64'>
                    <SideNav />
                </div>
                <div className='flex-grow p-6 md:overflow-y-auto md:p-12 no-scrollbar'>{children}</div>
            </div>
        </>
    )

}

export default ProtectedLayout