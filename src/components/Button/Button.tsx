import { Spinner } from "@/components"
import React, { useMemo } from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  isLoading?: boolean
  variant?: keyof typeof variantMapping
}

const variantMapping = {
  primary: "text-white bg-primary",
  danger: "text-white bg-danger",
  raw: "text-primary hover:bg-[#8ab4f818]",
  "raw-danger": "px-0 text-danger hover:underline",
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  variant = "primary",
  className = "",
  disabled,
  isLoading,
  ...props
}) => {
  const isUnactive = useMemo(() => isLoading || disabled, [isLoading, disabled])

  return (
    <button
      type={type}
      className={`relative px-4 text-rg font-medium rounded ${
        disabled ? "opacity-40" : ""
      } ${variantMapping[variant]} ${className}`}
      disabled={isUnactive}
      {...props}
    >
      <span className={`leading-[34px] ${isLoading ? "opacity-0" : ""}`}>
        {text}
      </span>
      {isLoading && (
        <Spinner
          size={24}
          className="absolute top-0 left-0 flex items-center justify-center w-full h-full"
          fill={variant === "primary" ? "white" : "primary"}
        />
      )}
    </button>
  )
}

export default React.memo(Button)
