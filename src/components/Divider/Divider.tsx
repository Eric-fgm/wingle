import React from "react"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string
  variant?: "vertical" | "horizontal"
}

const Divider: React.FC<DividerProps> = ({
  size = 24,
  className = "my-1",
  variant = "horizontal",
  ...props
}) => {
  return (
    <span
      style={{ [variant === "horizontal" ? "width" : "height"]: size }}
      className={`block flex-shrink-0 w-px h-px bg-modifier ${className}`}
      {...props}
    />
  )
}

export default React.memo(Divider)
