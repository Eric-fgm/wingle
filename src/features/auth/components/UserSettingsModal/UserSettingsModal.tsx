import { Scroller, Typography } from "@/components"
import { ChangePasswordTab, UserOverwievTab } from "@/features/auth/components"
import useAuth from "@/features/auth/hooks/useAuth"
import useModal from "@/features/modals/hooks/useModal"
import { Modal, ModalFooter, ModalHeader } from "@/utils"
import { getTouchedFieldsValues } from "@/utils/form"
import React, { useCallback, useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

export interface UserSettingsModalProps {}

const UserSettingsModal: React.FC<UserSettingsModalProps> = () => {
  const { user } = useAuth()
  const [activeTabId, setActiveTabId] = useState("overwiev")
  const { closeModal } = useModal("userSettings")

  const {
    register,
    formState: { dirtyFields, ...restFormState },
    handleSubmit,
    reset,
    ...formMethods
  } = useForm({
    defaultValues: user,
    shouldUnregister: true,
  })

  const [tabs, { text: activeTabTitle, component: ActiveTabComponent }] =
    useMemo(() => {
      const tabs = {
        overwiev: {
          id: "overwiev",
          text: "Przegląd",
          component: UserOverwievTab,
        },
        changePassword: {
          id: "changePassword",
          text: "Zmiana hasła",
          component: ChangePasswordTab,
        },
      }
      return [tabs, tabs[activeTabId as keyof typeof tabs]]
    }, [activeTabId])

  const handleChangeTab = useCallback((id: string) => setActiveTabId(id), [])

  const onSubmit = handleSubmit((fields) => {
    const touchedFieldsValues = getTouchedFieldsValues(fields, dirtyFields)
    console.log(touchedFieldsValues, fields)
  })

  return (
    <Modal className="w-[800px]" onRequestClose={closeModal}>
      <FormProvider
        formState={{ ...restFormState, dirtyFields }}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        {...formMethods}
      >
        <form
          className="flex flex-col h-[502px] overflow-hidden"
          onSubmit={onSubmit}
        >
          <div className="flex h-full overflow-hidden">
            <Scroller
              variant="thin"
              className="pl-4 pr-2 py-6 flex flex-col w-52 border-r"
            >
              {Object.values(tabs).map(({ id, text }) => (
                <Typography
                  key={id}
                  size="sm"
                  variant={`${id === activeTabId ? "white" : "normal"}`}
                  className={`mb-0.5 px-3 leading-8 rounded-md cursor-pointer ${
                    id === activeTabId ? "bg-dominant" : "hover:bg-dominant"
                  }`}
                  onClick={() => handleChangeTab(id)}
                >
                  {text}
                </Typography>
              ))}
            </Scroller>
            <Scroller variant="thin" className="flex-1">
              <ModalHeader title={activeTabTitle} onClose={closeModal} />
              <div className="px-6 pb-6">
                <ActiveTabComponent />
              </div>
            </Scroller>
          </div>
          <ModalFooter
            submitText="Zapisz"
            className="border-t"
            isDisabled={!Object.keys(dirtyFields).length}
            onClose={closeModal}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default UserSettingsModal
