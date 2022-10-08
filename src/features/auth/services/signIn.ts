import { auth } from "@/lib/firebaseClient"
import { signInWithEmailAndPassword } from "firebase/auth"

export const signIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    return user
  } catch (err) {
    console.log(err)
    throw new Error("Errorw while signing in")
  }
}
