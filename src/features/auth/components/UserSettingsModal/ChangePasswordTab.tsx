import { Divider, Input, Typography } from "@/components"
import { useFormContext } from "react-hook-form"

const ChangePasswordTab = () => {
  const { register } = useFormContext()

  return (
    <div>
      <Input
        {...register("oldPassword", { required: true })}
        placeholder="Stare hasło"
      />
      <Input
        {...register("newPassword", { required: true })}
        placeholder="Nowe hasło"
        className="mt-3"
      />
      <Input
        {...register("confirmNewPassword", { required: true })}
        placeholder="Powtórz nowe hasło"
        className="mt-3"
      />
      <Divider size="100%" className="my-6" />
      <Typography size="xs">
        Po ustawieniu kanału jako prywatnego tylko wybrani członkowie oraz osoby
        mające określone role będą mogli wyświetlać ten kanał.
      </Typography>
    </div>
  )
}

export default ChangePasswordTab
