import { storage } from "@/lib/firebaseClient"
import { ref, uploadBytes } from "firebase/storage"

export const uploadThumbnail = async (
  guildId: string,
  thumbnailAsFile: File
) => {
  try {
    return await uploadBytes(
      ref(storage, `guilds/${guildId}`),
      thumbnailAsFile,
      {
        cacheControl: "public,max-age=4000",
      }
    )
  } catch (err) {
    console.log(err)
    throw new Error("Error why upload thumbnail")
  }
}
