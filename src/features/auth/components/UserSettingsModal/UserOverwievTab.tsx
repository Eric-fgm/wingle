import { Divider, Input, Typography, UploadImage } from "@/components"
import { useFormContext } from "react-hook-form"

const UserOverwievTab = ({ avatarUrl = "" }: { avatarUrl?: string }) => {
  const { register, control } = useFormContext()

  return (
    <>
      <div className="mb-4 flex gap-6 items-center justify-center">
        <UploadImage
          name="avatarAsFile"
          control={control}
          defaultValue={avatarUrl}
          className="flex-shrink-0 w-24 h-24"
        />
        <div>
          <Input
            {...register("email", { required: true })}
            disabled
            className="mb-3"
          />
          <Input
            {...register("username", { required: true })}
            placeholder="Nazwa użytkownika"
          />
        </div>
      </div>
      <Divider size="100%" className="my-6" />
      <Typography size="xs">
        Po ustawieniu kanału jako prywatnego tylko wybrani członkowie oraz osoby
        mające określone role będą mogli wyświetlać ten kanał.
      </Typography>
    </>
  )
}

export default UserOverwievTab
