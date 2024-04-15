import { Children } from "react";
import Navbar from "./_componets/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <>
        <Navbar />
        <div className="">
            {children}
        </div>
        </>
    )

}

export default ProtectedLayout