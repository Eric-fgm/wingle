import { deleteThumbnail } from "@/features/guilds/services/deleteThumbnail"
import { uploadThumbnail } from "@/features/guilds/services/uploadThumbnail"
import type { UpdateGuildPayload } from "@/features/guilds/types"
import { firestore } from "@/lib/firebaseClient"
import { userSession } from "@/utils/storage"
import { useMutation } from "@tanstack/react-query"
import { collection, doc, updateDoc } from "firebase/firestore"

export const updateGuild = async ({
  id,
  thumbnailAsFile,
  ...patch
}: UpdateGuildPayload) => {
  try {
    const userId = userSession.get()?.uid
    if (!userId) throw new Error("Unauthorized")

    if (thumbnailAsFile) {
      const uploadResponse = await uploadThumbnail(id, thumbnailAsFile)
      patch.thumbnailUrl = uploadResponse.ref.name
    } else if (thumbnailAsFile === null) {
      deleteThumbnail(id)
      patch.thumbnailUrl = ""
    }

    await updateDoc(doc(collection(firestore, "guilds"), id), patch)

    return { id, ...patch }
  } catch (err) {
    console.log(err)
    throw new Error("Error while updating guild")
  }
}

export const useUpdateGuildMutate = () => {
  const { mutate, isLoading, ...restMutation } = useMutation(updateGuild)

  return { updateGuild: mutate, isUpdating: isLoading, ...restMutation }
}
