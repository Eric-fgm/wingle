import { ActionIcon, Avatar } from "@/components"
import useAuth from "@/features/auth/hooks/useAuth"
import useModal from "@/features/modals/hooks/useModal"
import React from "react"
import { MdHelp, MdSearch, MdSettings } from "react-icons/md"

export interface TopBarToolsProps {}

const TopBarTools: React.FC<TopBarToolsProps> = () => {
  const { user, signOut } = useAuth()
  const { openModal } = useModal("userSettings")

  return (
    <div className="ml-auto flex gap-1.5 items-center">
      <ActionIcon className="w-8 h-8 md:hidden">
        <MdSearch className="text-[22px] text-normal" />
      </ActionIcon>
      <ActionIcon>
        <MdHelp className="text-xl text-normal" />
      </ActionIcon>
      <ActionIcon onClick={openModal}>
        <MdSettings className="text-xl text-normal" />
      </ActionIcon>
      <Avatar
        username={user?.username ?? ""}
        className="ml-3 w-8 h-8"
        onClick={() => signOut()}
      />
    </div>
  )
}

export default React.memo(TopBarTools)
