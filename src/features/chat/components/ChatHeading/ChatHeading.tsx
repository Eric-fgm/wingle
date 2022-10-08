import { Typography } from "@/components"
import React from "react"

export interface ChatHeadingProps {
  title: string
  subtitle: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const ChatHeading: React.FC<ChatHeadingProps> = ({
  title,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div className="px-6 py-3.5 border-b">
      <span className="absolute">
        {React.isValidElement(Icon) ? Icon : <Icon className="text-muted" />}
      </span>
      <div className="pl-6">
        <Typography
          variant="white"
          size="sm"
          weight="medium"
          className="truncate"
        >
          {title}
        </Typography>
        <Typography
          size="xs"
          variant="muted"
          weight="medium"
          className="mt-0.5"
        >
          {subtitle}
        </Typography>
      </div>
    </div>
  )
}

export default React.memo(ChatHeading)
