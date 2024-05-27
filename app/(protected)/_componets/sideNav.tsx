"use client"

import Navbar from './links/links'

export default function sideNav() {


    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2 bg-library-200 dark:bg-black'>
            <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <Navbar />
            </div>
        </div>
    )
}