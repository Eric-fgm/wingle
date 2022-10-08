import { ActionButton, Scroller } from "@/components"
import {
  CollapsibleSection,
  SidebarHeading
} from "@/features/channels/components"
import { useChannelsByGuildIdQuery } from "@/features/channels/services/getChannelsByGuildId"
import type { ChannelProps } from "@/features/channels/types"
import { useUsersOfGuildQuery } from "@/features/guilds/services/getUsersOfGuild"
import { GuildProps } from "@/features/guilds/types"
import useModal from "@/features/modals/hooks/useModal"
import React, { useCallback, useMemo } from "react"
import { MdAdd } from "react-icons/md"
import { useParams } from "react-router-dom"

export interface ChannelsSidebarProps {
  guildEntity: GuildProps
}

const ChannelsSidebar: React.FC<ChannelsSidebarProps> = ({ guildEntity }) => {
  const { guildId } = useParams()
  const { channels } = useChannelsByGuildIdQuery({
    id: guildId,
  })
  const { users } = useUsersOfGuildQuery({ id: guildId })

  const { openModal: openChannelModal } = useModal("manageChannel")
  const { openModal: openGuildSettingsModal } = useModal("guildSettings")
  const { openModal: openInviteLinkModal } = useModal("inviteLink")

  const { publicChannels, privateChannels } = useMemo(
    () =>
      channels.reduce<{
        publicChannels: ChannelProps[]
        privateChannels: ChannelProps[]
      }>(
        (acc, channelEntity) => {
          if (channelEntity.isPrivate) acc.privateChannels.push(channelEntity)
          else acc.publicChannels.push(channelEntity)
          return acc
        },
        {
          publicChannels: [],
          privateChannels: [],
        }
      ),
    [channels]
  )

  const handleChannelModal = useCallback(
    (isPrivate?: boolean) => () => {
      openChannelModal({ guildId: guildEntity.id, isPrivate })
    },
    [guildEntity, openChannelModal]
  )

  const handleInviteLinkModal = useCallback(
    () => () => {
      openInviteLinkModal({ guildId: guildEntity.id })
    },
    [guildEntity, openInviteLinkModal]
  )

  const handleGuildSettingsModal = useCallback(() => {
    openGuildSettingsModal({ id: guildEntity.id })
  }, [guildEntity, openGuildSettingsModal])

  return (
    <div className="relative flex flex-col w-60 h-full border-r">
      <SidebarHeading
        title={guildEntity.name}
        subtitle={`${guildEntity.membersCount} osoby w pokoju`}
        onClick={handleGuildSettingsModal}
      />
      <Scroller variant="thin" className="relative pt-0 flex-1">
        {guildEntity.permissions.create && (
          <ActionButton
            icon={<MdAdd className="text-xl text-normal" />}
            text="Dodaj znajomego"
            className="mt-3.5 ml-2"
            onClick={handleInviteLinkModal()}
          />
        )}
        <CollapsibleSection
          title="KANAŁY PUBLICZNE"
          channels={publicChannels}
          onPlusClick={
            guildEntity.permissions.create ? handleChannelModal() : undefined
          }
        />
        {guildEntity.permissions.read && (
          <CollapsibleSection
            title="KANAŁY PRYWATNE"
            channels={privateChannels}
            onPlusClick={
              guildEntity.permissions.create
                ? handleChannelModal(true)
                : undefined
            }
          />
        )}
        <CollapsibleSection title="CZŁONKOWIE" users={users} />
      </Scroller>
    </div>
  )
}

export default React.memo(ChannelsSidebar)
