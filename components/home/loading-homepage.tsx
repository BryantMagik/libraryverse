"use client"

import React, { useEffect, useState } from 'react'
import { FaBookMedical, FaBookDead, FaBible, FaQuran } from 'react-icons/fa'
import { FaBookAtlas, FaBookJournalWhills, FaBookTanakh } from 'react-icons/fa6'

const iconsComponents = [
    FaBookMedical,
    FaBookDead,
    FaBookAtlas,
    FaBible,
    FaQuran,
    FaBookJournalWhills,
    FaBookTanakh,
]

const LoadingScreen: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
    const [icons, setIcons] = useState<JSX.Element[]>([])
    const [fadeOut, setFadeOut] = useState(false)
    const [hideScreen, setHideScreen] = useState(false)

    useEffect(() => {
        const initialIcons = iconsComponents.map((Icon, index) => (
            <Icon key={index} size="3em" style={{ opacity: 0, transition: 'opacity 1s' }} />
        ))
        setIcons(initialIcons)

        const timers = iconsComponents.map((Icon, index) => (
            setTimeout(() => {
                setIcons((currentIcons) => {
                    const updatedIcons = [...currentIcons]
                    updatedIcons[index] = (
                        <Icon key={index} size="3em" style={{ opacity: 1, transition: 'opacity 1s' }} />
                    )
                    return updatedIcons;
                })
            }, index * 200)
        ))

        const fadeOutTimer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setHideScreen(true)
                onLoadingComplete() // Notificar que la carga ha completado
            }, iconsComponents.length * 100 + 500) // Ocultar después de que todos los iconos hayan aparecido y un pequeño tiempo adicional
        }, (iconsComponents.length - 1) * 100 + 50) // Asegurar que se oculte después de que todos los iconos hayan aparecido y un pequeño tiempo adicional

        return () => {
            timers.forEach((timer) => clearTimeout(timer))
            clearTimeout(fadeOutTimer);
        }
    }, [onLoadingComplete])

    return (
        <div
            className={`flex h-screen w-screen items-center space-x-8 justify-center bg-white transition-opacity duration-200 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
            style={{ transitionDelay: `${(iconsComponents.length * 1000) + 100}ms`, display: hideScreen ? 'none' : 'flex' }}>
            {icons}
        </div>
    )
}

export default LoadingScreen

