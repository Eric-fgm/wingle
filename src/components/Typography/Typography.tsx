import React from "react"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  font?: keyof typeof fontMapping
  variant?: keyof typeof variantMapping
  size?: keyof typeof sizeMapping
  weight?: keyof typeof weightMapping
  tag?: keyof Omit<
    HTMLElementTagNameMap,
    "dir" | "font" | "frame" | "frameset" | "marquee"
  >
}

const variantMapping = {
  white: "text-white",
  primary: "text-primary",
  normal: "text-normal",
  muted: "text-muted",
}

const sizeMapping = {
  tiny: "text-tiny",
  mini: "text-mini",
  xs: "text-xs",
  rg: "text-rg",
  sm: "text-sm",
  md: "text-md",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
}

const weightMapping = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

const fontMapping = {
  primary: "font-sans",
  secondary: "font-sans-secondary",
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "normal",
  size = "base",
  weight = "normal",
  font = "primary",
  tag: Tag = "span",
  className = "",
  ...props
}) => {
  return (
    <Tag
      className={`block ${className} ${fontMapping[font]} ${variantMapping[variant]} ${sizeMapping[size]} ${weightMapping[weight]}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default React.memo(Typography)
