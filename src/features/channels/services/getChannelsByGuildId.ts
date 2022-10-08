import type { ChannelProps, ChannelResponse } from "@/features/channels/types"
import { useGuildById } from "@/features/guilds/services/getGuilds"
import { useRealtimeQuery } from "@/hooks/useRealtimeQuery"
import SolidHash from "@/icons/SolidHash"
import SolidHashLock from "@/icons/SolidHashLock"
import { firestore } from "@/lib/firebaseClient"
import { formatChannelTimestamp } from "@/utils/date"
import { collection, query, where } from "firebase/firestore"
import { useMemo } from "react"

export const getChannelsByGuildIdRef = ({ id = "", canRead = false }) =>
  query(
    collection(firestore, "channels"),
    where(`guildId`, "==", id),
    where("isPrivate", "in", [false, canRead])
  )

export const useChannelsByGuildIdQuery = ({ id }: { id?: string }) => {
  const guildEntity = useGuildById({ guildId: id })

  const canRead = guildEntity?.permissions?.read
  const isEnabled = !!id && canRead !== undefined

  const { data, ...restQuery } = useRealtimeQuery(
    ["guild.channels", id],
    getChannelsByGuildIdRef({ id, canRead }),
    {
      enabled: isEnabled,
      optionalParams: { id, canRead },
      suspense: true,
    }
  )

  const { channels, channelEntities } = useMemo(
    () =>
      data
        ? data.docs.reduce<{
            channels: ChannelProps[]
            channelEntities: Record<string, ChannelProps>
          }>(
            (acc, currSnapshot) => {
              const docSnapshotId = currSnapshot.id
              const docSnapshotData = currSnapshot.data() as ChannelResponse

              const channelProps = {
                ...docSnapshotData,
                id: docSnapshotId,
                icon: docSnapshotData.isPrivate ? SolidHashLock : SolidHash,
                modifiedAt: formatChannelTimestamp(docSnapshotData.modifiedAt),
                createdAt: formatChannelTimestamp(docSnapshotData.createdAt),
              }

              acc.channels.push(channelProps)
              acc.channelEntities[docSnapshotId] = channelProps

              return acc
            },
            { channels: [], channelEntities: {} }
          )
        : { channels: [], channelEntities: {} },
    [data]
  )

  return {
    channels,
    channelEntities,
    hasChannels: !!channels.length,
    isEnabled,
    ...restQuery,
  }
}

export const useChannelById = ({ id = "", guildId = "" }) => {
  const { channelEntities } = useChannelsByGuildIdQuery({ id: guildId })

  return channelEntities[id] || null
}
