import React from "react"
import { useController, UseControllerProps } from "react-hook-form"

type CheckboxProps = UseControllerProps<any> &
  React.HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean
  }

const Checkbox = ({
  className = "",
  disabled = false,
  ...props
}: CheckboxProps) => {
  const {
    field: { value, ...restField },
  } = useController(props)

  return (
    <div
      className={`relative flex items-center w-10 h-6 rounded-full cursor-pointer transition-colors ${
        value ? "bg-primary" : "bg-dominant"
      } ${className} ${disabled ? "opacity-50" : ""}`}
    >
      <span
        className={`absolute left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${
          value ? "translate-x-[15px]" : ""
        }`}
      />
      <input
        type="checkbox"
        checked={value}
        className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-10"
        disabled={disabled}
        {...restField}
      />
    </div>
  )
}

export default Checkbox
