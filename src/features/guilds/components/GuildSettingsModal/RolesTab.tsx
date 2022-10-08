import { Checkbox, Divider, Typography } from "@/components"
import type { Roles } from "@/features/guilds/types"
import { ROLES_MAP } from "@/utils/constans"
import React, { useCallback, useState } from "react"
import { useFormContext } from "react-hook-form"
import { MdLock } from "react-icons/md"

export interface RolesTabProps {}

const roles: Roles[] = ["admin", "moderator", "member", "guest"]

const CheckboxField = ({
  name,
  title,
  disabled = false,
}: {
  name: string
  title: string
  disabled?: boolean
}) => {
  const { control } = useFormContext()

  return (
    <>
      <label className="mt-4 flex items-center justify-between">
        <Typography
          size="sm"
          variant="white"
          className="flex flex-1 gap-1.5 items-center cursor-pointer"
        >
          <MdLock className="text-muted" />
          {title}
        </Typography>
        <Checkbox name={name} control={control} disabled={disabled} />
      </label>
      <Typography size="tiny" className="mt-1">
        Tylko wybrani członkowie i role będą mogli oglądać ten kanał.
      </Typography>
    </>
  )
}

const CheckboxesView = ({
  userRole,
  disabled = false,
  hidden = true,
}: {
  userRole: Roles
  disabled?: boolean
  hidden?: boolean
}) => {
  return (
    <div className={hidden ? "hidden" : ""}>
      <CheckboxField
        name={`roles.${userRole}.read`}
        title="Pozwól na odczytywanie"
        disabled={disabled}
      />
      <CheckboxField
        name={`roles.${userRole}.create`}
        title="Pozwól na tworzenie"
        disabled={disabled}
      />
      <CheckboxField
        name={`roles.${userRole}.update`}
        title="Pozwól na edytowanie"
        disabled={disabled}
      />
      <CheckboxField
        name={`roles.${userRole}.delete`}
        title="Pozwól na usuwanie"
        disabled={disabled}
      />
    </div>
  )
}

const RolesTab: React.FC<RolesTabProps> = () => {
  const [currentRoleTab, setCurrentRoleTab] = useState<Roles>("admin")

  const isActive = useCallback(
    (id: Roles) => id === currentRoleTab,
    [currentRoleTab]
  )

  return (
    <div className="-mt-1.5">
      <div className="flex">
        {roles.map((role) => (
          <Typography
            key={role}
            variant={isActive(role) ? "white" : "normal"}
            size="rg"
            weight="medium"
            className="relative mr-6 leading-9 cursor-pointer"
            onClick={() => setCurrentRoleTab(role)}
          >
            {ROLES_MAP[role]}
            {isActive(role) && (
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-primary rounded-t" />
            )}
          </Typography>
        ))}
      </div>
      <Divider size="100%" className="my-0" />
      {roles.map((role) => (
        <CheckboxesView
          key={role}
          userRole={role}
          disabled={role === "admin"}
          hidden={!isActive(role)}
        />
      ))}
    </div>
  )
}

export default RolesTab
