import { UserProfile } from "@/features/auth/types"

export interface MessageResponse {
  userId: string
  channelId: string
  content: string
  modifiedAt: number
  createdAt: number
}

export interface MessageProps
  extends Omit<MessageResponse, "modifiedAt" | "createdAt"> {
  id: string
  raw: boolean
  author: Omit<UserProfile, "id"> & { id: UserProfile["id"] | null }
  isSending: boolean
  modifiedAt: string
  createdAt: string
}

export interface CreateMessagePayload {
  channelId: MessageResponse["channelId"]
  content: MessageResponse["content"]
}
