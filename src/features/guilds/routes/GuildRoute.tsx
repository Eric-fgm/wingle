import { Spinner } from "@/components"
import { ChannelsSidebar } from "@/features/channels/components"
import { ChatView } from "@/features/chat/components"
import { NotFoundGuildPlaceholder } from "@/features/guilds/components"
import { useGuildById } from "@/features/guilds/services/getGuilds"
import React, { Suspense } from "react"
import { useParams } from "react-router-dom"

export interface GuildRouteProps {}

const GuildRoute: React.FC<GuildRouteProps> = () => {
  const { guildId } = useParams()
  const guildEntity = useGuildById({ guildId })

  return guildEntity ? (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-1 h-full">
        <ChannelsSidebar guildEntity={guildEntity} />
        <ChatView />
      </div>
    </Suspense>
  ) : (
    <NotFoundGuildPlaceholder />
  )
}

export default GuildRoute
