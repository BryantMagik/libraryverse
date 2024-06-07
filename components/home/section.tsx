import { useEffect, useRef } from "react"
import { PiTelevisionSimple } from "react-icons/pi"
import { LiaBookSolid } from "react-icons/lia"
import { GoRocket } from "react-icons/go"
import "./Section.css"

export default function Section() {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const section = sectionRef.current;
        if (section) {
            section.classList.add("appear-from-left")
        }
    }, []);

    return (
        <>
            <div
                ref={sectionRef}
                className="container grid grid-cols-1 mt-20 section"
            >
                <h2 className="text-3xl font-bold text-center text-library-700 mb-6">
                    ¿Qué puedes hacer en Libraryverse?
                </h2>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-center">

                        <div className="flex items-center justify-center mb-5">
                            <PiTelevisionSimple size={40} />
                        </div>
                        <p>
                            ¿Una historia digna de la gran pantalla? Conviértela en realidad en
                            Libraryverse.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mb-5">
                            <GoRocket size={40} />
                        </div>
                        <p>
                            ¿Prefieres una narrativa episódica? Explora el vasto terreno de las
                            series en Libraryverse.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mb-5">
                            <LiaBookSolid size={40} />
                        </div>
                        <p>
                            ¿Sueñas con publicar un libro? Hazlo realidad en Libraryverse, desde
                            la escritura hasta la promoción.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
