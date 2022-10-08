import { Input, Typography, UploadImage } from "@/components"
import { useCreateGuildMutate } from "@/features/guilds/services/createGuild"
import useModal from "@/features/modals/hooks/useModal"
import { Modal, ModalFooter, ModalHeader } from "@/utils"
import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export interface CreateGuildModalProps {}

const CreateGuildModal: React.FC<CreateGuildModalProps> = () => {
  const { closeModal } = useModal("createGuild")
  const { createGuild, isLoading } = useCreateGuildMutate()

  const { register, control, handleSubmit } = useForm<{
    name: string
    imageAsFile?: File
  }>({
    defaultValues: { name: "", imageAsFile: undefined },
  })

  const onSubmit = handleSubmit(async ({ imageAsFile, ...fields }) => {
    createGuild({ imageAsFile, ...fields }, { onSuccess: () => closeModal() })
  })

  return (
    <Modal onRequestClose={closeModal}>
      <form onSubmit={onSubmit}>
        <ModalHeader title="Stwórz serwer" onClose={closeModal} />
        <div className="px-6 pb-4">
          <UploadImage
            name="imageAsFile"
            control={control}
            className="mx-auto mb-4 w-20 h-20"
          />
          <Input
            {...register("name", { required: true })}
            placeholder="Nazwa serwera"
            autoFocus
            className="px-3 w-full h-10 font-sans text-sm bg-dominant rounded outline-none placeholder:text-muted"
          />
          <Typography size="tiny" className="mt-2">
            Tworząc serwer, zgadzasz się na{" "}
            <Link to="/" className="text-primary">
              Wytyczne dla Społeczności
            </Link>
            .
          </Typography>
        </div>
        <ModalFooter isLoading={isLoading} onClose={closeModal} />
      </form>
    </Modal>
  )
}

export default CreateGuildModal
