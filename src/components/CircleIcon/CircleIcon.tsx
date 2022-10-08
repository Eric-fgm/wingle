import React from "react"

export interface CircleIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isActive?: boolean
}

const CircleIcon: React.FC<CircleIconProps> = ({
  children,
  isActive = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-center w-12 h-12 transition-all cursor-pointer ${
        isActive
          ? "text-white bg-primary rounded-[18px]"
          : "text-normal bg-dominant rounded-[24px] hover:text-white hover:bg-primary hover:rounded-[18px] "
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default React.memo(CircleIcon)
