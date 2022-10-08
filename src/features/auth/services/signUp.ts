import { auth, firestore } from "@/lib/firebaseClient"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"

export const signUp = async ({
  email,
  password,
  username,
}: {
  email: string
  password: string
  username: string
}) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    console.log(user, user.uid)

    await setDoc(doc(collection(firestore, "users"), user.uid), {
      username,
      avatarUrl: "",
    })

    return user
  } catch (err) {
    console.log(err)
    throw new Error("Errorw while signing up")
  }
}
