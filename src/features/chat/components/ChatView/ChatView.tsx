import { Scroller, Spinner } from "@/components"
import {
  useChannelById,
  useChannelsByGuildIdQuery
} from "@/features/channels/services/getChannelsByGuildId"
import {
  ChatHeading,
  ChatInput,
  ChatPlaceholder,
  ChatWelcome,
  MessagesList
} from "@/features/chat/components"
import { useMessagesOfChannelQuery } from "@/features/chat/services/getMessagesOfChannel"
import { useScrollToBottom } from "@/hooks/useScrollToBottom"
import type { FC } from "react"
import { memo } from "react"
import { useParams } from "react-router-dom"

export interface ChatViewProps {}

const ChatView: FC<ChatViewProps> = () => {
  const { guildId, channelId } = useParams()
  const channelEntity = useChannelById({ id: channelId, guildId })
  const { hasChannels } = useChannelsByGuildIdQuery({
    id: guildId,
  })
  const {
    messages,
    messagesCount,
    isLoading: isLoadingMessages,
  } = useMessagesOfChannelQuery({
    channelId,
    guildId,
  })
  const { ref } = useScrollToBottom([messages])

  if (!hasChannels)
    return (
      <ChatPlaceholder
        title="BRAK KANAŁÓW TEKSTOWYCH"
        paragraph="Znajdujesz się w dziwnym miejscu. Nie masz dostępu do żadnych kanałów
  tekstowych, lub nie istnieją żadne na tym serwerze."
      />
    )

  if (!channelEntity)
    return (
      <ChatPlaceholder
        title="WYBIERZ KANAŁ TEKSTOWYCH"
        paragraph="Znajdujesz się w dziwnym miejscu. Nie masz dostępu do żadnych kanałów
tekstowych, lub nie istnieją żadne na tym serwerze."
      />
    )

  return isLoadingMessages ? (
    <Spinner />
  ) : (
    <div className="flex flex-1 flex-col">
      <ChatHeading
        icon={channelEntity.icon}
        title={channelEntity.name}
        subtitle={`${messagesCount || "Brak"} wiadomości`}
      />
      <Scroller ref={ref} className="s-mb-5 flex-1">
        <div className="pb-6 flex flex-col items-stretch justify-end min-h-full">
          {channelEntity && <ChatWelcome createdAt={channelEntity.createdAt} />}
          <MessagesList messages={messages} />
        </div>
      </Scroller>
      <ChatInput />
    </div>
  )
}

export default memo(ChatView)
