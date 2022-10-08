import React from "react"

export interface ActionIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: keyof typeof variantMap
}

const variantMap = {
  primary: "text-primary hover:bg-dominant",
  base: "text-normal hover:bg-dominant",
  light: "text-normal hover:bg-[#4b4b52]",
}

const ActionIcon: React.FC<ActionIconProps> = ({
  children,
  type = "button",
  variant = "base",
  className = "w-8 h-8",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`flex flex-shrink-0 items-center justify-center rounded-full ${variantMap[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default React.memo(ActionIcon)
