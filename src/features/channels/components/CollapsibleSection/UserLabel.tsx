import { Avatar } from "@/components"
import type { UserProfile } from "@/features/auth/types"
import React from "react"

export interface UserLabelProps extends UserProfile {
  isHidden?: boolean
}

const UserLabel: React.FC<UserLabelProps> = ({
  username,
  avatarUrl,
  isHidden,
}) => {
  return isHidden ? null : (
    <div className="mt-0.5 px-2.5 flex gap-2 items-center h-8 text-muted rounded-md select-none cursor-pointer hover:bg-dominant">
      <Avatar username={username} avatarUrl={avatarUrl} className="w-6 h-6" />
      <span className="block text-rg font-medium">{username}</span>
    </div>
  )
}

export default UserLabel
