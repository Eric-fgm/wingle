import type { ChannelProps } from "@/features/channels/types"
import { useGuildById } from "@/features/guilds/services/getGuilds"
import useModal from "@/features/modals/hooks/useModal"
import { BASE_ROUTES } from "@/utils/constans"
import React, { useCallback } from "react"
import { MdSettings } from "react-icons/md"
import { NavLink } from "react-router-dom"

const ChannelLabel: React.FC<
  ChannelProps & {
    isHidden: boolean
  }
> = ({ id, icon: Icon, name = "", guildId, isHidden = false, isPrivate }) => {
  const guildEntity = useGuildById({ guildId })
  const { openModal } = useModal("manageChannel")

  const handleSettingsClick = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      event.preventDefault()
      openModal({ channelId: id, guildId, isPrivate })
    },
    [id, guildId, isPrivate, openModal]
  )

  return (
    <NavLink
      to={`${BASE_ROUTES.guilds}/${guildId}/${BASE_ROUTES.channels}/${id}`}
      className={({ isActive }) =>
        `relative mt-0.5 flex items-center rounded-md group ${
          isActive
            ? "text-white bg-dominant"
            : `text-muted hover:bg-dominant ${isHidden ? "hidden" : ""}`
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="pl-3 pr-2 flex flex-1 gap-1.5 items-center h-8 overflow-hidden">
            <Icon className="flex-shrink-0 text-muted" />
            <span className="block font-sans text-sm font-medium truncate">
              {name}
            </span>
          </div>
          <div
            className={`mr-2 ${
              isActive ? "block" : "hidden group-hover:block"
            }`}
          >
            {guildEntity?.permissions?.update && (
              <MdSettings
                className="text-md text-normal opacity-80 hover:opacity-100"
                onClick={handleSettingsClick}
              />
            )}
          </div>
        </>
      )}
    </NavLink>
  )
}

export default ChannelLabel
