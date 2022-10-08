import { auth, firestore } from "@/lib/firebaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteField, doc, getDoc, writeBatch } from "firebase/firestore"

const deleteInviteLink = async ({ code }: { code: string }) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const inviteRef = doc(firestore, `invites/${code}`)

    const inviteSnapshot = (await getDoc(inviteRef)).data()

    if (!inviteSnapshot) throw new Error("Not found invite")

    const { guildId, userId: inviteUserId } = inviteSnapshot

    const batch = writeBatch(firestore)

    batch.set(
      doc(firestore, `users/${inviteUserId}`),
      {
        invites: { [guildId]: { [code]: deleteField() } },
      },
      { merge: true }
    )

    batch.delete(inviteRef)

    await batch.commit()

    return { guildId, code }
  } catch (err) {
    console.log(err)
    throw new Error("Error while deleting invite link")
  }
}

export const useDeleteInviteLinkMutate = () => {
  const queryClient = useQueryClient()

  const { mutate, ...restMutation } = useMutation(deleteInviteLink, {
    onSuccess: ({ guildId }) =>
      queryClient.invalidateQueries(["inviteLinks", guildId]),
  })

  return { deleteInviteLink: mutate, ...restMutation }
}
