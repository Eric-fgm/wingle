import { GuildsNavigation } from "@/features/guilds/components"
import React from "react"
import TopBar from "../partials/TopBar/TopBar"

export interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <GuildsNavigation />
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout
