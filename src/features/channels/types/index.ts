export interface ChannelResponse {
  name: string
  guildId: string
  isPrivate: boolean
  modifiedAt: number
  createdAt: number
}

export interface ChannelProps
  extends Omit<ChannelResponse, "modifiedAt" | "createdAt"> {
  id: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  modifiedAt: string
  createdAt: string
}

export interface CreateChannelPayload
  extends Omit<ChannelResponse, "modifiedAt" | "createdAt"> {}

export type DeleteChannelPayload = {
  id: ChannelProps["id"]
  guildId: ChannelProps["guildId"]
}

export type UpdateChannelPayload = Pick<ChannelProps, "id"> &
  Partial<ChannelProps>
