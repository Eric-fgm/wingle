import { Button, Spinner, Typography } from "@/components"
import { NotFoundInvitePlaceholde } from "@/features/guilds/components"
import { useInviteDataByCode } from "@/features/guilds/services/getInviteDataByCode"
import { useJoinGuildMutate } from "@/features/guilds/services/joinGuild"
import { getImageUrl } from "@/utils/image"
import React from "react"
import LazyLoad from "react-lazy-load"
import { useParams } from "react-router-dom"

export interface JoinGuildRouteProps {}

const JoinGuildRoute: React.FC<JoinGuildRouteProps> = () => {
  const { code } = useParams()
  const { inviteData, isLoading } = useInviteDataByCode({ code })
  const { joinGuild } = useJoinGuildMutate()

  if (isLoading) return <Spinner />

  if (!inviteData) return <NotFoundInvitePlaceholde />

  const { guild, user } = inviteData

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-20 h-20 bg-dominant text-normal overflow-hidden rounded-full">
          {guild.thumbnailUrl ? (
            <LazyLoad width={80} height={80}>
              <img
                src={getImageUrl(guild.thumbnailUrl, "guilds")}
                alt="guild-icon"
                className="w-full h-full object-cover"
              />
            </LazyLoad>
          ) : (
            <span className="text-md font-medium whitespace-nowrap">
              {guild.name}
            </span>
          )}
        </div>
        <Typography size="rg" className="mt-4">
          {user.username} zaprosił(-a) Cię do dołączenia
        </Typography>
        <Typography variant="white" size="xl" weight="medium" className="mt-2">
          {guild.name}
        </Typography>
        <Typography size="rg" className="mt-1.5 mb-6">
          {guild.membersCount} członków
        </Typography>
        <Button
          text="Zaakceptuj zaproszenie"
          onClick={() => {
            if (code) joinGuild({ code })
          }}
        />
      </div>
    </div>
  )
}

export default JoinGuildRoute
