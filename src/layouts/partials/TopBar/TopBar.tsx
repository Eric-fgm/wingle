import { Logo } from "@/components"
import { SearchBar } from "@/features/search/components"
import TopBarTools from "@/layouts/partials/TopBar/TopBarTools"
import { BASE_ROUTES } from "@/utils/constans"
import React from "react"

export interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="relative px-4 flex flex-shrink-0 items-center w-full h-16 border-b">
      <div className="ml-1 pr-4 flex-shrink-0 h-9 lg:w-[290px]">
        <Logo
          to={BASE_ROUTES.root}
          size={36}
          raw={false}
          className="inline-block"
        />
      </div>
      <SearchBar className="mr-3" />
      <TopBarTools />
    </div>
  )
}

export default React.memo(TopBar)
