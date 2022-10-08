import { ActionIcon } from "@/components"
import { useForm } from "react-hook-form"
import {
  MdOutlineCameraAlt,
  MdOutlineSend,
  MdTagFaces,
  MdUpload
} from "react-icons/md"
import { useParams } from "react-router-dom"
import { useCreateMessage } from "../../services/createMessage"

const ChatInput = () => {
  const { channelId } = useParams()
  const { createMessage } = useCreateMessage()
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: { content: "" },
  })

  const onSubmit = handleSubmit(({ content }) => {
    if (!channelId) return
    setValue("content", "")
    createMessage({
      content,
      channelId,
    })
  })

  return (
    <div className="px-4 h-16 z-10">
      <form
        className="mx-auto -mt-5 flex gap-2 items-center max-w-5xl w-full"
        onSubmit={onSubmit}
      >
        <div className="flex flex-1 items-center h-11 bg-dominant rounded-full">
          <input
            type="text"
            placeholder="Aa"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="pl-4 flex-1 h-full font-sans text-sm bg-transparent outline-none"
            {...register("content", { required: true })}
          />
          <div className="px-3 flex gap-1">
            <ActionIcon variant="light" className="w-7 h-7">
              <MdUpload className="w-5 h-5" />
            </ActionIcon>
            <ActionIcon variant="light" className="w-7 h-7">
              <MdTagFaces className="w-5 h-5" />
            </ActionIcon>
            <ActionIcon variant="light" className="w-7 h-7">
              <MdOutlineCameraAlt className="w-5 h-5" />
            </ActionIcon>
          </div>
        </div>
        <ActionIcon type="submit" variant="primary" className="w-9 h-9">
          <MdOutlineSend className="w-6 h-6" />
        </ActionIcon>
      </form>
    </div>
  )
}

export default ChatInput
