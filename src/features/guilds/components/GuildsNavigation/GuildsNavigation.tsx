import { CircleIcon, Divider, Scroller } from "@/components"
import { GuildIcon, HideIndicator } from "@/features/guilds/components"
import { useGuildsQuery } from "@/features/guilds/services/getGuilds"
import useModal from "@/features/modals/hooks/useModal"
import { BASE_ROUTES } from "@/utils/constans"
import React, { useCallback } from "react"
import { MdAdd } from "react-icons/md"

export interface GuildsNavigationProps {}

const GuildsNavigation: React.FC<GuildsNavigationProps> = () => {
  const { guilds, hasGuilds } = useGuildsQuery()
  const { isOpened, openModal } = useModal("createGuild")

  const handleOpenModal = useCallback(() => openModal({}), [openModal])

  return (
    <Scroller
      variant="camouflaged"
      className="pt-3 pb-[60px] flex flex-shrink-0 gap-2 flex-col items-center w-18 h-full border-r"
    >
      {guilds.map(({ id, ...guildProps }) => (
        <GuildIcon
          key={id}
          to={`${BASE_ROUTES.guilds}/${id}`}
          {...guildProps}
        />
      ))}
      {hasGuilds && <Divider />}
      <CircleIcon
        className="flex-shrink-0"
        onClick={handleOpenModal}
        isActive={isOpened}
      >
        <MdAdd className="text-2xl" />
      </CircleIcon>
      <HideIndicator />
    </Scroller>
  )
}

export default React.memo(GuildsNavigation)
