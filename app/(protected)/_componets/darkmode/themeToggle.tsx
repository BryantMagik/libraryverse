import { useState, useEffect } from "react"
import { FaMoon } from "react-icons/fa"
import { BsSunFill } from "react-icons/bs"
import toast, { Toaster } from "react-hot-toast"

export const ThemeToggle = () => {

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
            toast('Modo oscuro activado!', {
                icon: '🌕',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                },
            })
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
            toast('Modo oscuro desactivado!', {
                icon: '🔆',
                style: {
                    borderRadius: '10px',
                    background: 'bg-library-300',
                    color: 'black'
                },
            })
        }
    }, [darkMode])
    return (
        <>
            <Toaster />
            <div className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-library-300 cursor-pointer rounded-full p-1"
                onClick={() => setDarkMode(!darkMode)}
            >
                <FaMoon className="text-white" size={18} />
                <div className="absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                    style={darkMode ? { left: "2px" } : { right: "2px" }}
                >
                </div>
                <BsSunFill className="ml-auto text-yellow-400" size={18} />
            </div>
        </>
    )
}

