import React from "react"
import ReactModal, { Props } from "react-modal"

ReactModal.setAppElement("#root-modal")

const customStyles = {
  content: {
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    color: "#fff",
    background: "transparent",
    border: "none",
    borderRadius: 0,
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
  },
}

export interface ModalProps extends Omit<Props, "isOpen"> {
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  children,
  className = "w-[400px]",
  ...props
}) => {
  return (
    <ReactModal isOpen style={customStyles} {...props}>
      <div
        className={`flex flex-col max-h-[90vh] bg-secondary rounded-lg shadow-sm ${className}`}
      >
        {children}
      </div>
    </ReactModal>
  )
}

export default Modal
