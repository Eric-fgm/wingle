import { UserProfile } from "@/features/auth/types"
import { firestore } from "@/lib/firebaseClient"
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where } from "firebase/firestore"
import type { GetInviteLinksResponse } from "../types"

const getInviteLinksOfGuild = async (
  guildId: string
): Promise<GetInviteLinksResponse[]> => {
  try {
    const output: GetInviteLinksResponse[] = []

    const response = await getDocs(
      query(
        collection(firestore, "users"),
        where(`invites.${guildId}`, "!=", false)
      )
    )

    response.forEach((doc) => {
      const docData = doc.data() as UserProfile & {
        invites: Record<string, Record<string, number>>
      }
      const invites = docData.invites[guildId]
      if (!invites) return

      const invitesAsArray = Object.keys(invites).map((code) => ({
        code,
        count: invites[code] as number,
      }))

      output.push({ ...docData, id: doc.id, invites: invitesAsArray })
    })

    return output
  } catch (err) {
    console.log(err)
    throw new Error("Error while getting links")
  }
}

export const useInviteLinksOfGuildQuery = (guildId: string) => {
  const { data: invites = [], ...restQuery } = useQuery(
    ["inviteLinks", guildId],
    () => getInviteLinksOfGuild(guildId),
    {
      refetchOnMount: "always",
    }
  )

  return { invites, hasInvites: !!invites.length, ...restQuery }
}
