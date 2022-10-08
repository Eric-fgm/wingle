import { ActionIcon } from "@/components"
import React from "react"
import { MdChevronLeft } from "react-icons/md"

const HideIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-4">
      <ActionIcon className="w-8 h-8 bg-secondary shadow-md">
        <MdChevronLeft className="text-xl text-normal" />
      </ActionIcon>
    </div>
  )
}

export default React.memo(HideIndicator)
