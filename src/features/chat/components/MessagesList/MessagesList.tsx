import { Message } from "@/features/chat/components"
import type { MessageProps } from "@/features/chat/types"
import React from "react"

const MessagesList: React.FC<{ messages: MessageProps[] }> = ({ messages }) => {
  return (
    <div className="mx-auto max-w-5xl w-full">
      {messages.map((messageProps) => (
        <Message key={messageProps.id} {...messageProps} />
      ))}
    </div>
  )
}

export default React.memo(MessagesList)
