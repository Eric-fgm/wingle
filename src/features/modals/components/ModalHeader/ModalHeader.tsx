import { ActionIcon, Typography } from "@/components"
import React from "react"
import { MdOutlineClose } from "react-icons/md"

export interface ModalHeaderProps {
  title: string
  subtitle?: string
  onClose: () => void
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  onClose,
}) => {
  return (
    <div className="relative flex px-6 py-4">
      <div>
        <Typography variant="white" weight="medium">
          {title}
        </Typography>
        {subtitle && (
          <Typography size="xs" weight="medium" className="mt-0.5">
            {subtitle}
          </Typography>
        )}
      </div>
      <ActionIcon
        className="fixed -mt-1 right-4 w-8 h-8 text-2xl text-muted"
        onClick={onClose}
      >
        <MdOutlineClose />
      </ActionIcon>
    </div>
  )
}

export default ModalHeader
