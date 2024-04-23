"use client";
import React from "react"
import { IoIosArrowForward } from "react-icons/io"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa6"
import { useCurrentUser } from "@/hooks/use-current-user"
import Link from "next/link"
import { settings_button } from "@/lib/ui_data"

export const SettingsSidePanel = () => {
  const session = useCurrentUser()

  return (
    <div className="">
      <div className="dark:bg-slate-900 bg-slate-100 shadow-lg p-2 cursor-pointer rounded-xl flex-c-center gap-3">
        <Avatar className="z-0">
          <AvatarImage src={session.session?.image || ""} />
          <AvatarFallback className=" border-black dark:text-black z-0">
            <FaUser size={24} className="" />
          </AvatarFallback>
        </Avatar>
        <p className="text-xs">{session.session?.email || "user@mail.org"}</p>
      </div>

      <div className="mt-3">
        {settings_button.map((setting) => (
          <Link
            key={Math.random()}
            href={setting.href}
            className="flex-between w-full dark:hover:bg-slate-900 hover:bg-slate-100 hover:shadow-lg py-4 px-2 rounded-xl duration-200 transition-all"
          >
            <span className="flex items-center gap-2">
              <setting.icon size={22} />
              Usuario
            </span>
            <span>
              <IoIosArrowForward />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}