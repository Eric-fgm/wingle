import { Typography } from "@/components"
import React from "react"
import { MdChevronRight, MdCorporateFare } from "react-icons/md"

export interface SidebarHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle: string
}

const SidebarHeading: React.FC<SidebarHeadingProps> = ({
  title = "",
  subtitle = "",
  ...props
}) => {
  return (
    <div className="pl-4 pr-3 py-3.5 border-b cursor-pointer" {...props}>
      <div className="flex gap-1.5 items-center">
        <MdCorporateFare className="flex-shrink-0 text-lg text-muted" />
        <Typography
          variant="white"
          size="sm"
          weight="medium"
          className="truncate"
        >
          {title}
        </Typography>
        <MdChevronRight className="ml-auto text-xl text-normal rotate-90" />
      </div>
      <Typography
        variant="muted"
        size="xs"
        weight="medium"
        className="mt-0.5 pl-6 truncate"
      >
        {subtitle}
      </Typography>
    </div>
  )
}

export default SidebarHeading
