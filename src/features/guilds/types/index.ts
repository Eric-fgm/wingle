import { UserProfile } from "@/features/auth/types"

export type Roles = "admin" | "moderator" | "member" | "guest"

export interface GuildResponse {
  id: string
  name: string
  thumbnailUrl: string
  roles: {
    [key in Roles]: {
      create: boolean
      read: boolean
      update: boolean
      delete: boolean
    }
  }
  owner: string
  members: Record<string, Roles>
  description: string
  modifiedAt: string
  createdAt: string
}

export interface GuildProps extends GuildResponse {
  userRole: Roles
  permissions: GuildResponse["roles"][Roles]
  isOwner: boolean
  membersCount: number
}

export interface CreateGuildPayload {
  name: GuildProps["name"]
  imageAsFile?: File
}

export interface DeleteGuildPayload {
  id: GuildProps["id"]
  hasThumbnail: boolean
}

export type UpdateGuildPayload = Pick<GuildProps, "id"> &
  Partial<GuildProps & { thumbnailAsFile: File | null }>

export interface CreateInviteLinkPayload {
  guildId: string
  code: string
}

export type GetInviteLinksResponse = UserProfile & {
  invites: { code: string; count: number }[]
}
