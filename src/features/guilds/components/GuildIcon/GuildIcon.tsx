import { CircleIcon } from "@/components"
import { getImageUrl } from "@/utils/image"
import React from "react"
import type { IconType } from "react-icons/lib"
import LazyLoad from "react-lazy-load"
import { NavLink } from "react-router-dom"

export interface GuildIconProps {
  to?: string
  name: string
  thumbnailUrl?: string
  icon?: IconType
}

const GuildIcon: React.FC<GuildIconProps> = ({
  to = "",
  name,
  icon: Icon,
  thumbnailUrl,
}) => {
  return (
    <NavLink to={to} className="relative group">
      {({ isActive }) => (
        <>
          <CircleIcon isActive={isActive} className="overflow-hidden">
            {thumbnailUrl ? (
              <LazyLoad width={48} height={48}>
                <img
                  src={getImageUrl(thumbnailUrl, "guilds")}
                  alt="guild-icon"
                  className="w-full h-full object-cover"
                />
              </LazyLoad>
            ) : Icon ? (
              <Icon className="text-[22px]" />
            ) : (
              <span className="text-xs font-medium whitespace-nowrap">
                {name}
              </span>
            )}
          </CircleIcon>
          <span
            className={`absolute top-1/2 -right-[15px] w-2 h-2 rounded-l bg-white transition-all -translate-y-1/2 ${
              isActive ? "h-5" : "opacity-0 group-hover:opacity-100 "
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

export default React.memo(GuildIcon)
