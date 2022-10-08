import type { GuildProps, GuildResponse } from "@/features/guilds/types"
import { useRealtimeQuery } from "@/hooks/useRealtimeQuery"
import { auth, firestore } from "@/lib/firebaseClient"
import { collection, query, where } from "firebase/firestore"
import { useMemo } from "react"

const getGuildsRef = ({ userId }: { userId: string }) =>
  query(
    collection(firestore, "guilds"),
    where(`members.${userId}`, "!=", false)
  )

const getPermissions = ({
  roles,
  members = {},
  userId,
}: {
  roles?: GuildProps["roles"]
  members?: GuildProps["members"]
  userId: string
}) => {
  const userRole = members[userId] ?? "guest"
  const permissions =
    userRole && roles
      ? roles[userRole]
      : { read: false, create: false, update: false, delete: false }

  return { userRole, permissions }
}

export const useGuildsQuery = () => {
  const userId = auth.currentUser?.uid || ""

  const { data, ...restQuery } = useRealtimeQuery(
    ["guilds"],
    getGuildsRef({ userId }),
    { enabled: !!userId, suspense: true }
  )

  const { guilds, guildEntities } = useMemo(
    () =>
      data
        ? data.docs.reduce<{
            guilds: GuildProps[]
            guildEntities: Record<string, GuildProps>
          }>(
            (acc, currSnapshot) => {
              const snapshotId = currSnapshot.id
              const snapshotData = currSnapshot.data() as GuildResponse

              const permissions = getPermissions({
                roles: snapshotData.roles,
                members: snapshotData.members,
                userId,
              })

              const guildProps = {
                ...snapshotData,
                ...permissions,
                isOwner: userId === snapshotData.owner,
                membersCount: Object.keys(snapshotData.members).length,
                id: snapshotId,
              } as GuildProps

              acc.guilds.push(guildProps)
              acc.guildEntities[snapshotId] = guildProps

              return acc
            },
            { guilds: [], guildEntities: {} }
          )
        : { guilds: [], guildEntities: {} },
    [data, userId]
  )

  return {
    guilds,
    guildEntities,
    hasGuilds: !!guilds.length,
    ...restQuery,
  }
}

export const useGuildById = ({ guildId = "" }) => {
  const { guildEntities } = useGuildsQuery()

  return guildEntities[guildId] || null
}
