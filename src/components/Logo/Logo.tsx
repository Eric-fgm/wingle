import { Typography } from "@/components"
import React from "react"
import LazyLoad from "react-lazy-load"
import { Link, LinkProps } from "react-router-dom"

export interface LogoProps extends Omit<LinkProps, "to"> {
  to?: string
  raw?: boolean
  size?: number
}

const Logo: React.FC<LogoProps> = ({
  to = "",
  raw = true,
  size = 48,
  className = "",
}) => {
  const Wrapper = to ? Link : "div"

  return (
    <Wrapper to={to} className={className}>
      <span className="flex gap-2.5 items-center">
        <LazyLoad width={size} height={size} className="mx-auto">
          <img src="/assets/images/logo.svg" alt="logo" />
        </LazyLoad>
        {!raw && (
          <Typography size="lg" variant="white" weight="medium">
            Wingle
          </Typography>
        )}
      </span>
    </Wrapper>
  )
}

export default React.memo(Logo)
