"use client"

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hook/use-current-user"
import { SettingsMainpanel } from "../_componets/settings/main-panel"

const SettingsPage = () => {
  const userRole = useCurrentUser()

  const session = useSession()

  useEffect(() => {
    if (session.data === null) {
      session.status
      window.location.reload()
      return
    }
  }, [session])

  if (!userRole) {
    return null
  }

  return (
    <div className="max-h-max">
      <div className="container rounded-xl dark:bg-slate-950 bg-white w-full p-3 h-[87vh] ">
        <SettingsMainpanel />
      </div>
    </div>
  )
}

export default SettingsPage;