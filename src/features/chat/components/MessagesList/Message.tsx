import { Avatar, Typography } from "@/components"
import type { MessageProps } from "@/features/chat/types"
import React from "react"

const Message: React.FC<MessageProps> = ({
  author,
  content,
  createdAt,
  raw = false,
  isSending,
}) => {
  const { id, avatarUrl, username } = author

  return (
    <div className="relative pl-11">
      {!raw && (
        <>
          <Avatar
            username={id ? username : "?"}
            avatarUrl={avatarUrl}
            className="absolute mt-0.5 left-0 w-8 h-8"
          />
          <div className="mt-5 flex gap-2 items-center">
            <Typography variant="white" size="rg">
              {username}
            </Typography>
            <Typography variant="muted" size="tiny">
              {createdAt}
            </Typography>
          </div>
        </>
      )}
      <Typography
        size="rg"
        className={`-ml-1.5 px-1.5 leading-[22px] rounded hover:bg-hover ${
          isSending ? "opacity-50" : ""
        }`}
      >
        {content}
      </Typography>
    </div>
  )
}

export default React.memo(Message)
