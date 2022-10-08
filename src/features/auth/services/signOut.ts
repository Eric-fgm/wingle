import { auth } from "@/lib/firebaseClient"
import { signOut as firebaseSignOut } from "firebase/auth"

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return true
  } catch (err) {
    console.log(err)
    throw new Error("Errorw while signing out")
  }
}
