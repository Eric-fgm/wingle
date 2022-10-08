import type { UserMetadata } from "@/features/auth/types"
import { firestore } from "@/lib/firebaseClient"
import { userSession } from "@/utils/storage"
import { doc, getDoc } from "firebase/firestore"

export const getProfile = async (): Promise<UserMetadata> => {
  try {
    const session = userSession.get()
    if (!session) throw new Error("Unauthorized")

    const { uid, email } = session

    const response = (await getDoc(doc(firestore, `users/${uid}`))).data() as {
      avatarUrl: string
      username: string
    }

    return { id: uid, email, ...response }
  } catch (err) {
    console.log(err)
    throw new Error("Error while getting profile")
  }
}
