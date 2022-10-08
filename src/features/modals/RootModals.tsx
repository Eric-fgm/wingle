import { UserSettingsModal } from "@/features/auth/components"
import { ManageChannelModal } from "@/features/channels/components"
import {
  CreateGuildModal,
  GuildSettingsModal,
  InviteLinkModal
} from "@/features/guilds/components"
import React, { ComponentProps, useMemo } from "react"
import create from "zustand"

export type ModalComponents = {
  createGuild: typeof CreateGuildModal
  manageChannel: typeof ManageChannelModal
  guildSettings: typeof GuildSettingsModal
  userSettings: typeof UserSettingsModal
  inviteLink: typeof InviteLinkModal
}
export type ModalComponentsKeys = keyof ModalComponents

interface ModalStore {
  openedModals: {
    [key in ModalComponentsKeys]?: ComponentProps<ModalComponents[key]>
  }
  openModal: <T extends ModalComponentsKeys>(
    key: T,
    props: ComponentProps<ModalComponents[T]>
  ) => void
  closeModal: <T extends ModalComponentsKeys>(key: T) => void
}

export const modalsStore = create<ModalStore>((set) => ({
  openedModals: {},
  openModal: (key, props) =>
    set((state) => ({
      ...state,
      openedModals: { ...state.openedModals, [key]: props },
    })),
  closeModal: (key) =>
    set((state) => {
      const openedModals = { ...state.openedModals }
      delete openedModals[key]
      return {
        ...state,
        openedModals,
      }
    }),
}))

const RootModals: React.FC = () => {
  const openedModals = modalsStore((state) => state.openedModals)

  const modalsComponents: ModalComponents = useMemo(
    () => ({
      createGuild: CreateGuildModal,
      manageChannel: ManageChannelModal,
      guildSettings: GuildSettingsModal,
      userSettings: UserSettingsModal,
      inviteLink: InviteLinkModal,
    }),
    []
  )

  return (
    <>
      {(Object.keys(openedModals) as ModalComponentsKeys[]).map((modalKey) => {
        // [To Do] Fix typesafe
        const Component = modalsComponents[modalKey] as any
        const props = openedModals[modalKey] as ComponentProps<typeof Component>
        return <Component key={modalKey} {...props} />
      })}
    </>
  )
}

export default RootModals
