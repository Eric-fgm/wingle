import { auth, firestore } from "@/lib/firebaseClient"
import { BASE_ROUTES } from "@/utils/constans"
import { useMutation } from "@tanstack/react-query"
import {
  collection,
  doc,
  getDoc,
  increment,
  writeBatch
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const joinGuild = async ({
  code,
}: {
  code: string
}): Promise<{ guildId: string }> => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const inviteRef = doc(collection(firestore, "invites"), code)

    const inviteSnapshot = (await getDoc(inviteRef)).data()

    if (!inviteSnapshot) throw new Error("Not found invite")

    const { guildId, userId: inviteUserId } = inviteSnapshot

    const inviteUserRef = doc(collection(firestore, "users"), inviteUserId)
    const userRef = doc(collection(firestore, "users"), userId)
    const guildsRef = doc(collection(firestore, "guilds"), guildId)

    const batch = writeBatch(firestore)

    batch.update(guildsRef, {
      [`members.${userId}`]: "guest",
    })

    batch.update(inviteUserRef, {
      [`invites.${guildId}.${code}`]: increment(1),
    })

    batch.update(userRef, {
      [`guilds.${guildId}`]: true,
    })

    await batch.commit()

    return { guildId }
  } catch (err) {
    console.log(err)
    throw new Error("Error while joining")
  }
}

export const useJoinGuildMutate = () => {
  const navigate = useNavigate()

  const { mutate, ...restMutation } = useMutation(joinGuild, {
    onSuccess: ({ guildId }) => navigate(`${BASE_ROUTES.guilds}/${guildId}`),
  })

  return { joinGuild: mutate, ...restMutation }
}
