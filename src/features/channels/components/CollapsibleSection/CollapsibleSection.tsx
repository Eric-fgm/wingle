import { Typography } from "@/components"
import type { UserProfile } from "@/features/auth/types"
import { ChannelLabel } from "@/features/channels/components"
import type { ChannelProps } from "@/features/channels/types"
import React, { useCallback, useState } from "react"
import { MdAdd, MdChevronRight } from "react-icons/md"
import UserLabel from "./UserLabel"

export interface CollapsibleSectionProps {
  title: string
  channels?: ChannelProps[]
  users?: UserProfile[]
  onPlusClick?: () => void
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  channels = [],
  users = [],
  onPlusClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleTitleClick = useCallback(
    () => setIsCollapsed((wasCollapsed) => !wasCollapsed),
    []
  )

  const handlePlusClick = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      event.stopPropagation()
      if (onPlusClick) onPlusClick()
    },
    [onPlusClick]
  )

  return (
    <>
      <div
        className="mt-3.5 flex items-center h-6 select-none cursor-pointer"
        onClick={handleTitleClick}
      >
        <MdChevronRight
          className={`-ml-1 mr-1 text-muted text-sm transition-transform duration-100 ${
            isCollapsed ? "" : "rotate-90"
          }`}
        />
        <Typography
          size="tiny"
          variant="muted"
          weight="semibold"
          className="tracking-wide"
        >
          {title}
        </Typography>
        {onPlusClick && (
          <MdAdd
            className="ml-auto text-lg text-muted hover:text-normal"
            onClick={handlePlusClick}
          />
        )}
      </div>
      {channels.map((channelProps) => (
        <ChannelLabel
          key={channelProps.id}
          isHidden={isCollapsed}
          {...channelProps}
        />
      ))}

      {users.map((channelProps) => (
        <UserLabel
          key={channelProps.id}
          isHidden={isCollapsed}
          {...channelProps}
        />
      ))}
    </>
  )
}

export default React.memo(CollapsibleSection)
