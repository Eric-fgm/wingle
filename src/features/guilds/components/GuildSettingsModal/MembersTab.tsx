import { Avatar, Typography } from "@/components"
import { useUsersOfGuildQuery } from "@/features/guilds/services/getUsersOfGuild"
import type { GuildProps, Roles } from "@/features/guilds/types"
import { ROLES_MAP } from "@/utils/constans"
import React from "react"

export interface MembersTabProps {
  id: string
  members?: GuildProps["members"]
}

const MemberLinear: React.FC<{
  username: string
  avatarUrl?: string
  userRole: Roles
}> = ({ username, avatarUrl, userRole }) => {
  return (
    <div className="flex gap-2 items-center h-14 border-b">
      <Avatar username={username} avatarUrl={avatarUrl} className="w-6 h-6" />
      <div className="flex items-center">
        <Typography size="rg" variant="white">
          {username}
        </Typography>
        <Typography size="tiny" className="mx-1.5">
          •
        </Typography>
        <Typography size="xs">{ROLES_MAP[userRole]}</Typography>
      </div>
    </div>
  )
}

const MembersTab: React.FC<MembersTabProps> = ({ id, members = {} }) => {
  const { users, isLoading } = useUsersOfGuildQuery({ id })

  return (
    <div className="">
      <div className="-mt-1.5 flex border-b">
        <Typography size="rg" className="basis-1/2 leading-9">
          {users.length} członek
        </Typography>
      </div>
      {isLoading ? (
        "loading..."
      ) : (
        <div>
          {users.map(({ id, ...userProps }) => (
            <MemberLinear
              key={id}
              userRole={members[id] ?? "guest"}
              {...userProps}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default React.memo(MembersTab)
