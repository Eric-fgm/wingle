import React from "react"

export interface BlankLayoutProps {
  children: React.ReactNode
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return <div className="w-full h-full overflow-y-auto">{children}</div>
}

export default BlankLayout
