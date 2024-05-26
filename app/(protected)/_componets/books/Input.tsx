import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface InputProps {
    hasLabel: boolean
    placeholder: string
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    value?: string | number;
}

export const Input: React.FC<InputProps> = ({ hasLabel, label, placeholder, value, onChange, handleKeyPress }) => {
    return (
        <div className="flex flex-col justify-center h-full w-full">
            {hasLabel === true &&
                <p className="font-fira darK:text-gray-100 text-gray-800">{label}</p>
            }
            <div className="relative flex justify-center items-center">
                <input type="search" id="default-search"
                    className="p-2 pl-7 w-[95%] text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder} onChange={onChange} onKeyDown={handleKeyPress} />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
    )
}
