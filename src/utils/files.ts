export const convertToBase64 = (file?: File): Promise<string | null> =>
  new Promise((resolve) => {
    if (!file || !file.type.includes("image")) return resolve("")
    const reader = new FileReader()
    reader.onloadend = () => {
      const { result } = reader
      if (typeof result === "string") resolve(result)
      resolve("")
    }
    reader.readAsDataURL(file)
  })
