"use client"
import React from 'react'
import Link from 'next/link'

interface SettingsButtonProps {
    children?: React.ReactNode
}

export const SettingsButton = ({ children }: SettingsButtonProps) => {
    return (
        <span className="cursor-pointer">
            <Link href="/settings">
                {children}
            </Link>
        </span>
    );
};
