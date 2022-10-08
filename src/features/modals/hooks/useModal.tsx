import {
  ModalComponents,
  ModalComponentsKeys,
  modalsStore,
} from "@/features/modals/RootModals"
import type { ComponentProps } from "react"
import { useCallback, useMemo } from "react"

const useModal = <T extends ModalComponentsKeys>(key: T) => {
  const { openedModals, openModal, closeModal } = modalsStore((state) => state)

  const isOpened = useMemo(() => !!openedModals[key], [openedModals, key])

  const handleOpenModal = useCallback(
    (props: ComponentProps<ModalComponents[T]>) => openModal(key, props),
    [key, openModal]
  )

  const handleCloseModal = useCallback(() => closeModal(key), [key, closeModal])

  return {
    isOpened,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  }
}

export default useModal
