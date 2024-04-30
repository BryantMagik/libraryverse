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
];

const LoadingScreen: React.FC = () => {
    const [icons, setIcons] = useState<JSX.Element[]>([])
    const [fadeOut, setFadeOut] = useState(false)
    const [hideScreen, setHideScreen] = useState(false)

    useEffect(() => {
        if (icons.length < iconsComponents.length) {
            const timer = setTimeout(() => {
                setIcons((currentIcons) => [
                    ...currentIcons,
                    React.createElement(iconsComponents[currentIcons.length], {
                        key: currentIcons.length,
                        size: '3em',
                        style: { opacity: 0, transition: 'opacity 8s' },
                    }),
                ])
            }, 700)

            setTimeout(() => {
                setIcons((currentIcons) =>
                    currentIcons.map((icon, index) =>
                        index === currentIcons.length - 1
                            ? React.cloneElement(icon, {
                                style: { ...icon.props.style, opacity: 1 },
                              })
                            : icon
                    )
                )
            }, 200)

            return () => clearTimeout(timer);
        } else {
            const fadeOutTimer = setTimeout(() => {
                setFadeOut(true)
                setTimeout(() => setHideScreen(true), 1000)
            }, 500);
            return () => clearTimeout(fadeOutTimer)
        }
    }, [icons.length])

    return (
        <div
            className={`flex h-screen w-screen items-center space-x-8 justify-center bg-white transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
            style={{ transitionDelay: `${iconsComponents.length * 500}ms`, display: hideScreen ? 'none' : 'flex' }}>
            {icons}
        </div>
    )
}

export default LoadingScreen

