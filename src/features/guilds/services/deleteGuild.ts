import { deleteThumbnail } from "@/features/guilds/services/deleteThumbnail"
import type { DeleteGuildPayload } from "@/features/guilds/types"
import { auth, firestore } from "@/lib/firebaseClient"
import { BASE_ROUTES } from "@/utils/constans"
import { useMutation } from "@tanstack/react-query"
import {
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  where,
  writeBatch
} from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"

const deleteGuild = async ({ id, hasThumbnail }: DeleteGuildPayload) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const channelsToDelete = await getDocs(
      query(collection(firestore, "channels"), where("guildId", "==", id))
    )

    const invitesToDelete = await getDocs(
      query(collection(firestore, "invites"), where(`guildId`, "==", id))
    )

    if (hasThumbnail) deleteThumbnail(id)

    const batch = writeBatch(firestore)

    batch.delete(doc(collection(firestore, "guilds"), id))

    batch.update(doc(collection(firestore, "users"), userId), {
      [`guilds.${[id]}`]: deleteField(),
    })

    channelsToDelete.forEach((channelSnapshot) => {
      batch.delete(channelSnapshot.ref)
    })

    invitesToDelete.forEach((inviteSnapshot) => {
      batch.delete(inviteSnapshot.ref)
    })

    await batch.commit()

    return { id }
  } catch (err) {
    console.log(err)
    throw new Error("Error while deleting guild")
  }
}

export const useDeleteGuildMutate = () => {
  const { guildId } = useParams()
  const navigate = useNavigate()

  const { mutate, ...restMutation } = useMutation(deleteGuild, {
    onSuccess: ({ id }) => {
      if (guildId && guildId !== id) return

      navigate(BASE_ROUTES.root, { replace: true })
    },
  })

  return { deleteGuild: mutate, ...restMutation }
}
