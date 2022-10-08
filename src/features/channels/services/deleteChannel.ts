import type { DeleteChannelPayload } from "@/features/channels/types"
import { firestore } from "@/lib/firebaseClient"
import { useMutation } from "@tanstack/react-query"
import { collection, deleteDoc, doc } from "firebase/firestore"

export const deleteChannel = async (payload: DeleteChannelPayload) => {
  try {
    await deleteDoc(doc(collection(firestore, "channels"), payload.id))

    return payload
  } catch (err) {
    console.log(err)
    throw new Error("Error while deleting channel")
  }
}

export const useDeleteChannel = () => {
  return useMutation(deleteChannel)
}
