import { convertToBase64 } from "@/utils/files"
import { getImageUrl } from "@/utils/image"
import React, { useCallback, useEffect, useState } from "react"
import { useController, UseControllerProps } from "react-hook-form"
import { MdAdd, MdUpload } from "react-icons/md"

export type UploadImageProps = UseControllerProps<any> &
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string
  }

const UploadImage: React.FC<UploadImageProps> = ({
  className = "w-20 h-20",
  defaultValue,
  ...props
}) => {
  const {
    field: { value, onChange, ...restField },
  } = useController(props)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    let abortConverting = false
    const tryConvertToBase64 = async () => {
      const imageAsBase64 = await convertToBase64(value)
      if (!abortConverting) setPreview(imageAsBase64)
    }
    tryConvertToBase64()
    return () => {
      abortConverting = true
    }
  }, [value])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.files?.[0]),
    [onChange]
  )

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-normal bg-dominant rounded-full cursor-pointer ${className}`}
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-full rounded-full object-cover"
        />
      ) : defaultValue && value !== null ? (
        <img
          src={getImageUrl(defaultValue, "guilds")}
          alt="thumbnail"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <>
          <MdUpload className="text-3xl" />
          <span className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-primary rounded-full">
            <MdAdd className="text-lg" />
          </span>
          <span className="mt-0.5 text-[10px] font-semibold">UPLOAD</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        value=""
        className="absolute top-0 left-0 text-[0px] w-full h-full cursor-pointer opacity-0"
        onChange={handleChange}
        {...restField}
      />
    </div>
  )
}

export default UploadImage
