import { auth, firestore } from "@/lib/firebaseClient"
import { useMutation } from "@tanstack/react-query"
import { collection, deleteField, doc, writeBatch } from "firebase/firestore"

const leaveGuild = async ({ guildId }: { guildId: string }) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const batch = writeBatch(firestore)

    batch.update(doc(collection(firestore, "guilds"), guildId), {
      [`members.${[userId]}`]: deleteField(),
    })

    batch.update(doc(collection(firestore, "users"), userId), {
      [`guilds.${[guildId]}`]: deleteField(),
    })

    await batch.commit()

    return true
  } catch (err) {
    console.log(err)
    throw new Error("Error while leaving guild")
  }
}

export const useLeaveGuildMutate = () => {
  const { mutate, ...restMutation } = useMutation(leaveGuild)

  return { leaveGuild: mutate, ...restMutation }
}
