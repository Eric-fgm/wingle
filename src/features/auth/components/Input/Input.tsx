import React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`px-4 w-full h-12 text-md bg-transparent border border-accent rounded outline-none placeholder:text-muted ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

// const Input: React.FC<InputProps> = ({
//   type = "text",
//   className = "",
//   ...props
// }) => {
//   return (
//     <input
//       type={type}
//       className={`px-4 w-full h-12 text-md bg-transparent border border-accent rounded outline-none placeholder:text-muted ${className}`}
//       {...props}
//     />
//   )
// }

export default React.memo(Input)
