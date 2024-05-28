"use client";

import { poppins } from "@/components/ui/font";
import { ThemeToggle } from "./darkmode/themeToggle";
import { UserButton } from "@/app/(protected)/_componets/user-button";
import { useSession } from "next-auth/react";

export default function NavbarApp() {
    const { data: session } = useSession();

    return (
        <nav className="flex justify-between items-center w-full px-4 text-library-600 dark:bg-black nav dark:text-emerald-400 bg-library-200 sm:flex-none">
            <div className="flex h-20 items-center px-3">
                <h1 className={`${poppins.className} text-lg font-semibold`}>LibraryVerse</h1>
            </div>
            <div className="flex items-center space-x-6">
                <ThemeToggle />
                {session ? (
                    <UserButton label="ha" user={session.user} />
                ) : (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}
