"use client"

import NavbarHome from "@/components/home/navbar-homepage"
import Image from 'next/image'

const HomePage = () => {

    return (
        <>
            <NavbarHome />
            <div className="w-100 h-max bg-almond-50 flex flex-row p-24">
                <Image className="relative" src={"/home/h1-img-01.png"}
                    width={390} height={315} alt="libraryverse" />
                <Image className="relative right-9 z-10" src={"/home/h1-img-02.png"}
                    width={230} height={336} alt="libraryverse" />
                <Image className="relative right-60 z-1" src={"/home/h1-img-03.png"}
                    width={390} height={317} alt="libraryverse" />
            </div>
        </>
    )
}

export default HomePage
