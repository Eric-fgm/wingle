import React, { forwardRef } from "react"

export interface ScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: keyof typeof variantMapper
}

const variantMapper = {
  base: "pl-4 py-4",
  thin: "pl-2 py-2 thin",
  camouflaged: "camouflaged",
}

const Scroller = forwardRef<HTMLDivElement, ScrollerProps>(
  ({ children, className = "", variant = "base" }, ref) => {
    return (
      <div
        ref={ref}
        className={`scroller overflow-y-scroll ${variantMapper[variant]} ${className}`}
      >
        {children}
      </div>
    )
  }
)

Scroller.displayName = "Scroller"

export default React.memo(Scroller)
