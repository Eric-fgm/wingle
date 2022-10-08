import React, { useCallback, useRef } from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const updateBoundings = useCallback(() => {
      if (!textareaRef.current) return
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }, [])

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateBoundings()
        if (onChange) onChange(event)
      },
      [updateBoundings, onChange]
    )

    return (
      <textarea
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ;(
              ref as React.MutableRefObject<HTMLTextAreaElement | null>
            ).current = node
          }
          if (!node) return
          textareaRef.current = node
          updateBoundings()
        }}
        className={`px-3 py-2 font-sans text-sm bg-dominant rounded outline-none resize-none placeholder:text-muted ${className}`}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
