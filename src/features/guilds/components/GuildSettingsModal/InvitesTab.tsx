import { ActionIcon, Avatar, Typography } from "@/components"
import React, { useCallback } from "react"
import { MdRemoveCircle } from "react-icons/md"
import { useDeleteInviteLinkMutate } from "../../services/deleteInviteLink"
import { useInviteLinksOfGuildQuery } from "../../services/getInviteLinks"

export interface InvitesTabProps {
  id: string
}

const InviteLinear: React.FC<{
  code: string
  count: number
  username: string
  avatarUrl?: string
}> = ({ code, count, username, avatarUrl }) => {
  const { deleteInviteLink, isLoading } = useDeleteInviteLinkMutate()

  const handleDelete = useCallback(() => {
    deleteInviteLink({ code })
  }, [code, deleteInviteLink])

  return (
    <div className="relative flex items-center h-14 border-b group">
      <div className="flex gap-2 items-center basis-2/5">
        <Avatar username={username} avatarUrl={avatarUrl} className="w-6 h-6" />
        <Typography size="rg" variant="white">
          {username}
        </Typography>
      </div>
      <div className="basis-1/3">
        <Typography size="rg" variant="white" className="basis-1/3">
          {code}
        </Typography>
      </div>
      <div className="flex-1">
        <Typography size="rg" variant="white" className="basis-1/3">
          {count}
        </Typography>
      </div>
      <ActionIcon
        disabled={isLoading}
        className="absolute right-0 text-danger opacity-0 group-hover:opacity-100"
        onClick={handleDelete}
      >
        <MdRemoveCircle />
      </ActionIcon>
    </div>
  )
}

const InvitesTab: React.FC<InvitesTabProps> = ({ id }) => {
  const { invites, isLoading } = useInviteLinksOfGuildQuery(id)

  return (
    <div className="">
      <div className="-mt-1.5 flex items-center h-9 border-b">
        <Typography size="rg" className="basis-2/5">
          Osoba zapraszająca
        </Typography>
        <Typography size="rg" className="basis-1/3">
          Kod zaprosenia
        </Typography>
        <Typography size="rg" className="flex-1">
          Użyć
        </Typography>
      </div>
      <div>
        {isLoading
          ? "Loading..."
          : invites.map(({ id, username, avatarUrl, invites }) => (
              <React.Fragment key={id}>
                {invites.map((inviteLinkProps) => (
                  <InviteLinear
                    key={inviteLinkProps.code}
                    username={username}
                    avatarUrl={avatarUrl}
                    {...inviteLinkProps}
                  />
                ))}
              </React.Fragment>
            ))}
      </div>
    </div>
  )
}

export default InvitesTab
