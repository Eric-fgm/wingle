import { Divider, Scroller, Typography } from "@/components"
import {
  InvitesTab,
  MembersTab,
  OverwievTab,
  RolesTab
} from "@/features/guilds/components"
import { useDeleteGuildMutate } from "@/features/guilds/services/deleteGuild"
import { useGuildById } from "@/features/guilds/services/getGuilds"
import { useLeaveGuildMutate } from "@/features/guilds/services/leaveGuild"
import { useUpdateGuildMutate } from "@/features/guilds/services/updateGuild"
import useModal from "@/features/modals/hooks/useModal"
import { Modal, ModalFooter, ModalHeader } from "@/utils"
import { getTouchedFieldsValues } from "@/utils/form"
import React, { useCallback, useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { FaTrashAlt } from "react-icons/fa"
import { MdLogout } from "react-icons/md"

export interface GuildSettingsModalProps {
  id: string
}

const GuildSettingsModal: React.FC<GuildSettingsModalProps> = ({ id }) => {
  const [activeTabId, setActiveTabId] = useState("overwiev")
  const { closeModal } = useModal("guildSettings")
  const { updateGuild, isUpdating } = useUpdateGuildMutate()
  const { deleteGuild } = useDeleteGuildMutate()
  const { leaveGuild } = useLeaveGuildMutate()
  const guildEntity = useGuildById({ guildId: id })

  const {
    register,
    formState: { dirtyFields, ...restFormState },
    handleSubmit,
    reset,
    ...formMethods
  } = useForm({
    defaultValues: {
      name: guildEntity?.name ?? "",
      description: guildEntity?.description ?? "",
      roles: guildEntity?.roles,
      thumbnailAsFile: undefined,
    },
    shouldUnregister: true,
  })

  const [tabs, { text: activeTabTitle, component: ActiveTabComponent }] =
    useMemo(() => {
      const tabs = {
        overwiev: {
          id: "overwiev",
          text: "Przegląd",
          component: OverwievTab,
        },
        roles: {
          id: "roles",
          text: "Role",
          component: RolesTab,
        },
        members: {
          id: "members",
          text: "Członkowie",
          component: MembersTab,
        },
        invites: {
          id: "invites",
          text: "Zaproszenia",
          component: InvitesTab,
        },
      }
      return [tabs, tabs[activeTabId as keyof typeof tabs]]
    }, [activeTabId])

  // useEffect(() => {
  //   if (!guild) return
  //   reset(guild)
  // }, [guild, reset])

  const handleDelete = useCallback(
    () =>
      guildEntity &&
      deleteGuild(
        { id: guildEntity.id, hasThumbnail: !!guildEntity.thumbnailUrl },
        { onSuccess: () => closeModal() }
      ),
    [guildEntity, deleteGuild, closeModal]
  )

  const handleLeave = useCallback(
    () =>
      guildEntity &&
      leaveGuild(
        { guildId: guildEntity.id },
        { onSuccess: () => closeModal() }
      ),
    [guildEntity, leaveGuild, closeModal]
  )

  const handleChangeTab = useCallback((id: string) => setActiveTabId(id), [])

  const onSubmit = handleSubmit((fields) => {
    const touchedFieldsValues = getTouchedFieldsValues(fields, dirtyFields)
    console.log(touchedFieldsValues, fields)
    updateGuild(
      { id, ...touchedFieldsValues },
      { onSuccess: () => closeModal() }
    )
  })

  return (
    <Modal className="w-[800px]" onRequestClose={closeModal}>
      <FormProvider
        formState={{ ...restFormState, dirtyFields }}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        {...formMethods}
      >
        <form
          className="flex flex-col h-[502px] overflow-hidden"
          onSubmit={onSubmit}
        >
          <div className="flex h-full overflow-hidden">
            <Scroller
              variant="thin"
              className="pl-4 pr-2 py-6 flex flex-col w-52 border-r"
            >
              {Object.values(tabs).map(({ id, text }) => (
                <Typography
                  key={id}
                  size="sm"
                  variant={`${id === activeTabId ? "white" : "normal"}`}
                  className={`mb-0.5 px-3 leading-8 rounded-md cursor-pointer ${
                    id === activeTabId ? "bg-dominant" : "hover:bg-dominant"
                  }`}
                  onClick={() => handleChangeTab(id)}
                >
                  {text}
                </Typography>
              ))}
              <Divider size="100%" />
              {guildEntity?.isOwner ? (
                <Typography
                  size="sm"
                  className="mb-0.5 px-3 flex gap-2 items-center leading-8 rounded-md cursor-pointer hover:bg-dominant"
                  onClick={handleDelete}
                >
                  Usuń
                  <FaTrashAlt className="ml-auto text-xs" />
                </Typography>
              ) : (
                <Typography
                  size="sm"
                  className="mb-0.5 px-3 flex gap-2 items-center leading-8 rounded-md cursor-pointer hover:bg-dominant"
                  onClick={handleLeave}
                >
                  Opuść
                  <MdLogout className="ml-auto text-sm" />
                </Typography>
              )}
            </Scroller>
            <Scroller variant="thin" className="flex-1">
              <ModalHeader title={activeTabTitle} onClose={closeModal} />
              <div className="px-6 pb-6">
                <ActiveTabComponent
                  id={id}
                  thumbnailUrl={guildEntity?.thumbnailUrl}
                  members={guildEntity?.members}
                />
              </div>
            </Scroller>
          </div>
          <ModalFooter
            submitText="Zapisz"
            className="border-t"
            isDisabled={!Object.keys(dirtyFields).length}
            isLoading={isUpdating}
            onClose={closeModal}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default GuildSettingsModal
