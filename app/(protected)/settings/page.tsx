"use client"

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";

// import { SettingsPanel } from "@/app/(protected)/_components/settings_page";
// import { SettingsSidePanel } from "@/app/(protected)/_components/settings_side_panel";
// import { HeaderSet } from "@/app/(protected)/_components/header_set";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsMainpanel } from "../_componets/settings/main-panel";
import { SettingsSidePanel } from "../_componets/settings/side-panel";

const SettingsPage = () => {
  const userRole = useCurrentUser()

  const session = useSession()

  useEffect(() => {
    if (session.data === null) {
      session.status
      window.location.reload()
      return;
    }
  }, [session])

  if (!userRole) {
    return null
  }

  return (
    <div className="min-h-[92vh] w-full px-4 p-2 mx-auto ">
      <div className="container mx-auto py-10 mt-3 rounded-xl dark:bg-slate-950 bg-white grid grid-cols-[300px_1fr] w-full p-3
    h-[87vh] ">
        <>
          <SettingsSidePanel />
        </>
        <>
          <SettingsMainpanel />
        </>
      </div>
    </div>
  )
}

export default SettingsPage;