import { Typography } from "@/components"
import React from "react"
import LazyLoad from "react-lazy-load"

export interface AvatarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  username: string
  avatarUrl?: string
}

const Avatar: React.FC<AvatarProps> = ({
  username = "Anonymous",
  avatarUrl = "",
  className = "w-8 h-8",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center bg-dominant rounded-full ${className}`}
      {...props}
    >
      {avatarUrl ? (
        <LazyLoad>
          <img src={avatarUrl} alt="avatar" />
        </LazyLoad>
      ) : (
        <Typography size="rg" weight="medium">
          {username[0]}
        </Typography>
      )}
    </button>
  )
}

export default React.memo(Avatar)
