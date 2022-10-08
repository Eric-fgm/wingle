import type { UserProfile } from "@/features/auth/types"
import type { GuildResponse } from "@/features/guilds/types/index"
import { firestore } from "@/lib/firebaseClient"
import { useQuery } from "@tanstack/react-query"
import { collection, doc, getDoc } from "firebase/firestore"

const getInviteDataByCode = async (code: string) => {
  try {
    const inviteResponse = (
      await getDoc(doc(collection(firestore, "invites"), code))
    ).data()

    if (!inviteResponse) throw new Error("Not found invite")

    const { guildId, userId } = inviteResponse as {
      guildId: string
      userId: string
    }

    const [guildResponse, userResponse] = await Promise.all([
      getDoc(doc(collection(firestore, "guilds"), guildId)),
      getDoc(doc(collection(firestore, "users"), userId)),
    ])

    const guild = guildResponse.data() as GuildResponse
    const user = userResponse.data() as UserProfile

    if (!guild || !user) throw new Error("Not found guild or user")

    return {
      code,
      guild: { ...guild, membersCount: Object.keys(guild.members).length },
      user,
    }
  } catch (err) {
    console.log(err)
    throw new Error("Error while getting invite data")
  }
}

export const useInviteDataByCode = ({ code = "" }) => {
  const { data: inviteData, ...restQuery } = useQuery(
    ["inviteData", code],
    () => getInviteDataByCode(code)
  )

  return { inviteData, ...restQuery }
}
