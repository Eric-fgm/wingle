import type { UpdateChannelPayload } from "@/features/channels/types"
import { firestore } from "@/lib/firebaseClient"
import { useMutation } from "@tanstack/react-query"
import { collection, doc, updateDoc } from "firebase/firestore"

export const updateChannel = async ({ id, ...patch }: UpdateChannelPayload) => {
  try {
    await updateDoc(doc(collection(firestore, "channels"), id), patch)
    return { id, ...patch }
  } catch (err) {
    throw new Error("Error while updating channel")
  }
}

export const useUpdateChannel = () => {
  return useMutation(updateChannel)
}
