import {
  Button,
  Divider,
  Input,
  Textarea,
  Typography,
  UploadImage,
} from "@/components"
import React from "react"
import { useFormContext } from "react-hook-form"

export interface OverwievTabProps {
  thumbnailUrl?: string
}

const OverwievTab: React.FC<OverwievTabProps> = ({ thumbnailUrl }) => {
  const { register, control, setValue } = useFormContext()

  return (
    <>
      <div className="mb-4 flex items-center justify-center">
        <UploadImage
          name="thumbnailAsFile"
          control={control}
          defaultValue={thumbnailUrl}
          className="flex-shrink-0 w-24 h-24"
        />
        <div className="pl-4 max-w-[160px]">
          <Typography size="xs">
            Zalecamy obraz o wymiarach co najmniej 512x512
          </Typography>
          {thumbnailUrl && (
            <Button
              variant="raw-danger"
              text="Usuń"
              className="pl-0 pr-0"
              onClick={() =>
                setValue("thumbnailAsFile", null, { shouldDirty: true })
              }
            />
          )}
        </div>
      </div>
      <Input
        {...register("name", { required: true })}
        placeholder="Nazwa kanału"
      />
      <Divider size="100%" className="my-6" />
      <Textarea
        {...register("description")}
        placeholder="Dodaj opis serwera"
        className="w-full min-h-[72px]"
      />
      <Typography size="xs" className="mt-1.5">
        Po ustawieniu kanału jako prywatnego tylko wybrani członkowie oraz osoby
        mające określone role będą mogli wyświetlać ten kanał.
      </Typography>
    </>
  )
}

export default OverwievTab
