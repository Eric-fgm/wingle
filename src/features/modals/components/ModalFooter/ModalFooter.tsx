import { Button } from "@/components"
import React from "react"

export interface ModalFooterProps {
  children?: React.ReactNode
  closeText?: string
  submitText?: string
  isDisabled?: boolean
  isLoading?: boolean
  className?: string
  onClose: () => void
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  closeText = "Anuluj",
  submitText = "Stwórz",
  isDisabled = false,
  isLoading = false,
  className = "",
  onClose,
}) => {
  return (
    <div className={`relative px-6 py-4 flex gap-2 justify-end ${className}`}>
      {children && children}
      <Button variant="raw" text={closeText} onClick={onClose} />
      <Button
        type="submit"
        text={submitText}
        disabled={isDisabled}
        isLoading={isLoading}
      />
    </div>
  )
}

export default React.memo(ModalFooter)
