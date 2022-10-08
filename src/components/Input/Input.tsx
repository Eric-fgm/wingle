import React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  autoFocus?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoFocus = false,
      autoCapitalize = "off",
      autoCorrect = "off",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        className={`px-3 w-full h-10 font-sans text-sm bg-dominant rounded outline-none placeholder:text-muted ${className} ${
          disabled ? "text-normal" : "text-white"
        }`}
        disabled={disabled}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input
