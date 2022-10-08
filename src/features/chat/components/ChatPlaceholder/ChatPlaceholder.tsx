import { Typography } from "@/components"
import SolidChatPlaceholder from "@/icons/SolidChatPlaceholder"
import React from "react"

export interface ChatPlaceholderProps {
  title: string
  paragraph: string
}

const ChatPlaceholder: React.FC<ChatPlaceholderProps> = ({
  title,
  paragraph,
}) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="-mt-12 text-center">
        <SolidChatPlaceholder className="mx-auto -mb-8" />
        <Typography size="md" variant="muted" weight="semibold">
          {title}
        </Typography>
        <Typography size="sm" variant="muted" className="mt-2 max-w-lg">
          {paragraph}
        </Typography>
      </div>
    </div>
  )
}

export default ChatPlaceholder
