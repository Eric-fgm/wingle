import type { CreateChannelPayload } from "@/features/channels/types"
import { firestore } from "@/lib/firebaseClient"
import { BASE_ROUTES } from "@/utils/constans"
import { useMutation } from "@tanstack/react-query"
import { addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const createChannel = async (payload: CreateChannelPayload) => {
  try {
    const currentTimestamp = Date.now()

    const channelProps = {
      ...payload,
      modifiedAt: currentTimestamp,
      createdAt: currentTimestamp,
    }

    const { id } = await addDoc(collection(firestore, "channels"), channelProps)

    return { id, ...channelProps }
  } catch (err) {
    console.log(err)
    throw new Error("Error while creating channel")
  }
}

export const useCreateChannel = () => {
  const navigate = useNavigate()

  return useMutation(createChannel, {
    onSuccess: async ({ id, guildId }) => {
      navigate(`${BASE_ROUTES.guilds}/${guildId}/${BASE_ROUTES.channels}/${id}`)
    },
  })
}
