import { useUsersOfGuildQuery } from "@/features/guilds/services/getUsersOfGuild"
import { useRealtimeQuery } from "@/hooks/useRealtimeQuery"
import { auth, firestore } from "@/lib/firebaseClient"
import { TIME_AS_MILISECONDS } from "@/utils/constans"
import { collection, orderBy, query, where } from "firebase/firestore"
import { useMemo } from "react"
import { formatMessageTimestamp } from "../../../utils/date"
import { MessageProps, MessageResponse } from "../types"

const getMessagesOfChannel = ({ channelId }: { channelId: string }) =>
  query(
    collection(firestore, "messages"),
    orderBy("createdAt", "desc"),
    where(`channelId`, "==", channelId)
  )

export const useMessagesOfChannelQuery = ({ channelId = "", guildId = "" }) => {
  const userId = auth.currentUser?.uid

  const { userEntities } = useUsersOfGuildQuery({ id: guildId })

  const { data, ...restQuery } = useRealtimeQuery(
    ["channel.messages", channelId],
    getMessagesOfChannel({ channelId }),
    {
      enabled: !!channelId && !!userId,
      optimisticUpdate: true,
    }
  )

  const { messages, messageEntities } = useMemo(() => {
    if (!data) return { messages: [], messageEntities: {} }

    const messages: MessageProps[] = []
    const messageEntities: Record<string, MessageProps> = {}
    const messageCount = data.size
    let i = messageCount - 1
    let lastTimestamp = 0
    let lastUserId = ""

    for (i; i >= 0; i -= 1) {
      const messageDoc = data.docs[i]!

      const messageId = messageDoc.id
      const messageData = messageDoc.data() as MessageResponse

      const author = userEntities[messageData.userId] ?? {
        id: null,
        username: "Konto usunięte",
      }

      const messageProps = {
        ...messageData,
        id: messageId,
        author,
        raw:
          messageData.createdAt - lastTimestamp <
            TIME_AS_MILISECONDS.minute * 5 && lastUserId === messageData.userId,
        isSending: i === 0 && data.metadata.hasPendingWrites,
        modifiedAt: formatMessageTimestamp(messageData.modifiedAt),
        createdAt: formatMessageTimestamp(messageData.createdAt),
      }

      lastTimestamp = messageData.createdAt
      lastUserId = messageData.userId
      messages.push(messageProps)
      messageEntities[messageId] = messageProps
    }

    return {
      messages,
      messageEntities,
    }
  }, [data, userEntities])

  return {
    messages,
    messageEntities,
    hasMessages: !!messages.length,
    messagesCount: messages.length,
    ...restQuery,
  }
}

export const useMessageById = ({ id = "", channelId = "" }) => {
  const { messageEntities } = useMessagesOfChannelQuery({ channelId })

  return messageEntities[id] || null
}
