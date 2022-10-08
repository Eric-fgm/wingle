import { Typography } from "@/components"
import React from "react"

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  text: string
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  type = "button",
  text = "",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`pl-2.5 pr-5 flex gap-2 items-center h-10 bg-dominant rounded-full shadow ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <Typography size="rg" weight="medium">
        {text}
      </Typography>
    </button>
  )
}

export default React.memo(ActionButton)
