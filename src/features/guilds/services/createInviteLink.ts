import { useMutation } from "@tanstack/react-query"
import { auth, firestore } from "@/lib/firebaseClient"
import { doc, writeBatch } from "firebase/firestore"
import type { CreateInviteLinkPayload } from "@/features/guilds/types"

export const createInviteLink = async ({
  guildId,
  code,
}: CreateInviteLinkPayload) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const batch = writeBatch(firestore)

    batch.set(
      doc(firestore, `users/${userId}`),
      {
        invites: { [guildId]: { [code]: 0 } },
      },
      { merge: true }
    )

    batch.set(doc(firestore, `invites/${code}`), {
      guildId,
      userId,
    })

    await batch.commit()

    return true
  } catch (err) {
    console.log(err)
  }
}

export const useCreateInviteLink = () => {
  const { mutate, ...restMutation } = useMutation(createInviteLink)

  return { createInviteLink: mutate, ...restMutation }
}
