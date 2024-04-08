import { poppins } from "@/components/ui/fonts"
import Navlinks from "../nav-links"

interface HeaderProps {
    label: string
}

export const Header = ({
    label: string
}: HeaderProps) => {
    return (
        <nav className='relative flex flew-wrap items-center justify-between bg-[#151d20] font-[sans-serif] min-h-[60px]'>
            <div className='flex flex-wrap items-center justify-between px-3'>
                <h1 className={`${poppins.className} text-white `}>LibraryVerse</h1>
            </div>
            {/* SEPARARLO */}
            <div className="flex flex-wrap items-center justify-between px-3">
                <input
                    type="search"
                    className="relative m-0 block w-[500px] min-w-0 flex-auto rounded border border-solid 
                    border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 
                    text-base font-normal text-surface transition duration-300 ease-in-out 
                    focus:border-primary focus:text-white focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                    placeholder="Buscar"
                    aria-label="search"
                    aria-describedby="button-addon2" />
            </div>
            <div className="flex flex-wrap items-center justify-between px-3">
            </div>
            <Navlinks />
        </nav>
    )
}
