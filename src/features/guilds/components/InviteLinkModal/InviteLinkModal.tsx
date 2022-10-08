import { ActionIcon, Input, Typography } from "@/components"
import { useCreateInviteLink } from "@/features/guilds/services/createInviteLink"
import { useGuildById } from "@/features/guilds/services/getGuilds"
import useModal from "@/features/modals/hooks/useModal"
import { Modal, ModalFooter, ModalHeader } from "@/utils"
import { generateId } from "@/utils/generateId"
import React from "react"
import { useForm } from "react-hook-form"
import { MdInfo, MdLink } from "react-icons/md"

export interface InviteLinkModalProps {
  guildId: string
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ guildId }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { code: generateId() },
  })
  const { closeModal } = useModal("inviteLink")
  const { createInviteLink, isLoading } = useCreateInviteLink()
  const guildEntity = useGuildById({ guildId })

  const onSubmit = handleSubmit(({ code }) => {
    createInviteLink({ guildId, code }, { onSuccess: () => closeModal() })
  })

  return (
    <Modal onRequestClose={closeModal}>
      <form onSubmit={onSubmit}>
        <ModalHeader
          title="Zaproś członków"
          subtitle={`do ${guildEntity?.name}`}
          onClose={closeModal}
        />
        <div className="pl-6 pr-4">
          <Input disabled {...register("code", { required: true })} />
          <span className="mt-3 flex items-center justify-between">
            <Typography
              size="sm"
              variant="white"
              className="flex flex-1 gap-1.5 items-center"
            >
              <MdInfo className="text-muted text-base" />
              Wygenerowano kod
            </Typography>
            <ActionIcon className="ml-auto w-7 h-7">
              <MdLink className="text-normal text-lg" />
            </ActionIcon>
          </span>
          <Typography size="tiny">
            Tylko wybrani członkowie i role będą mogli oglądać ten kanał.
          </Typography>
        </div>
        <ModalFooter isLoading={isLoading} onClose={closeModal} />
      </form>
    </Modal>
  )
}

export default InviteLinkModal
