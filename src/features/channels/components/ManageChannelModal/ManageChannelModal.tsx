import { Button, Checkbox, Input, Typography } from "@/components"
import { useCreateChannel } from "@/features/channels/services/createChannel"
import { useDeleteChannel } from "@/features/channels/services/deleteChannel"
import { useChannelById } from "@/features/channels/services/getChannelsByGuildId"
import { useUpdateChannel } from "@/features/channels/services/updateChannel"
import { useGuildById } from "@/features/guilds/services/getGuilds"
import useModal from "@/features/modals/hooks/useModal"
import { Modal, ModalFooter, ModalHeader } from "@/utils"
import React, { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { MdLock } from "react-icons/md"

export interface ManageChannelModalProps {
  channelId?: string
  guildId: string
  isPrivate?: boolean
}

const ManageChannelModal: React.FC<ManageChannelModalProps> = ({
  channelId,
  guildId,
  isPrivate = false,
}) => {
  const { closeModal } = useModal("manageChannel")
  const guild = useGuildById({ guildId })
  const channel = useChannelById({ id: channelId, guildId })
  const { mutate: createChannel, isLoading } = useCreateChannel()
  const { mutate: updateChannel, isLoading: isUpdating } = useUpdateChannel()
  const { mutate: deleteChannel, isLoading: isDeleting } = useDeleteChannel()

  const { register, control, handleSubmit } = useForm({
    defaultValues: { name: channel?.name ?? "", guildId, isPrivate },
  })

  const isFormLoading = useMemo(
    () => isLoading || isUpdating || isDeleting,
    [isLoading, isUpdating, isDeleting]
  )

  const handleDeleteChannel = useCallback(
    () => channel && deleteChannel(channel, { onSuccess: () => closeModal() }),
    [channel, deleteChannel, closeModal]
  )

  const onSubmit = handleSubmit((fields) => {
    if (channel)
      updateChannel(
        { id: channel.id, name: fields.name, isPrivate: fields.isPrivate },
        { onSuccess: () => closeModal() }
      )
    else createChannel(fields, { onSuccess: () => closeModal() })
  })

  return (
    <Modal onRequestClose={closeModal}>
      <form onSubmit={onSubmit}>
        <ModalHeader
          title={`${channel ? "Edytuj" : "Stwórz"} kanał`}
          subtitle={`w ${guild?.name}`}
          onClose={closeModal}
        />
        <div className="px-6 pb-4">
          <Input
            {...register("name", { required: true })}
            autoFocus
            placeholder="Nazwa kanału"
            className="px-3 w-full h-10 font-sans text-sm bg-dominant rounded outline-none placeholder:text-muted"
          />
          <label className="mt-4 flex items-center justify-between">
            <Typography
              size="sm"
              variant="white"
              className="flex flex-1 gap-1.5 items-center cursor-pointer"
            >
              <MdLock className="text-muted" />
              Kanał prywatny
            </Typography>
            <Checkbox name="isPrivate" control={control} />
          </label>
          <Typography size="tiny" className="mt-1">
            Tylko wybrani członkowie i role będą mogli oglądać ten kanał.
          </Typography>
        </div>
        <ModalFooter
          submitText={`${channel ? "Edytuj" : "Stwórz"}`}
          isLoading={isFormLoading}
          onClose={closeModal}
        >
          {channel && (
            <Button
              variant="danger"
              text="Usuń"
              className="mr-auto"
              disabled={isFormLoading}
              onClick={handleDeleteChannel}
            />
          )}
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ManageChannelModal
