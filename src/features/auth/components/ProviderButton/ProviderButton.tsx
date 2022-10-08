import { Typography } from "@/components"
import React from "react"
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai"

export interface ProviderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "google" | "twitter"
}

const ProviderButton: React.FC<ProviderButtonProps> = ({
  variant = "google",
  className = "",
  ...props
}) => {
  return (
    <button
      type="submit"
      className={`px-4 flex gap-2 items-center justify-center h-11 border border-accent rounded hover:bg-tertiary ${className}`}
      {...props}
    >
      {variant === "google" ? (
        <>
          <span>
            <AiOutlineGoogle className="text-lg" />
          </span>
          <Typography size="sm" variant="white">
            Google
          </Typography>
        </>
      ) : (
        <>
          <span>
            <AiOutlineTwitter className="text-lg" />
          </span>
          <Typography size="sm" variant="white">
            Twitter
          </Typography>
        </>
      )}
    </button>
  )
}

export default React.memo(ProviderButton)
