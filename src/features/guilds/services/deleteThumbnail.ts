import { storage } from "@/lib/firebaseClient"
import { deleteObject, ref } from "firebase/storage"

export const deleteThumbnail = async (id: string) => {
  try {
    const storageRef = ref(storage, `guilds/${id}`)
    return await deleteObject(storageRef)
  } catch (err) {
    console.log(err)
  }
}
