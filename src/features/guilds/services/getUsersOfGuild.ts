import type { UserProfile } from "@/features/auth/types"
import { useRealtimeQuery } from "@/hooks/useRealtimeQuery"
import { auth, firestore } from "@/lib/firebaseClient"
import { collection, query, where } from "firebase/firestore"
import { useMemo } from "react"

const getUsersOfGuild = ({ id }: { id: string }) =>
  query(collection(firestore, "users"), where(`guilds.${id}`, "==", true))

export const useUsersOfGuildQuery = ({ id = "" }: { id?: string }) => {
  const userId = auth.currentUser?.uid

  const { data, ...restQuery } = useRealtimeQuery(
    ["guild.users", id],
    getUsersOfGuild({ id }),
    { enabled: !!id, suspense: true }
  )

  const { users, userEntities } = useMemo(
    () =>
      data
        ? data.docs.reduce<{
            users: UserProfile[]
            userEntities: Record<string, UserProfile>
          }>(
            (acc, currSnapshot) => {
              const docId = currSnapshot.id
              const userData = currSnapshot.data() as UserProfile

              const userProps = {
                ...userData,
                username:
                  docId === userId
                    ? `${userData.username} (Ty)`
                    : userData.username,
                id: docId,
              }

              acc.users.push(userProps)
              acc.userEntities[docId] = userProps

              return acc
            },
            { users: [], userEntities: {} }
          )
        : { users: [], userEntities: {} },
    [data, userId]
  )

  return { users, userEntities, hasUsers: !!users.length, ...restQuery }
}

export const useUserById = ({ guildId = "", id = "" }) => {
  const { userEntities } = useUsersOfGuildQuery({ id: guildId })

  return userEntities[id] || null
}
