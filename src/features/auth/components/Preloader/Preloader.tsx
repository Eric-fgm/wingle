import { Logo } from "@/components"
import React from "react"

const Preloader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Logo size={64} />
    </div>
  )
}

export default React.memo(Preloader)
