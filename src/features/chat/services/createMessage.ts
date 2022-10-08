import type { CreateMessagePayload } from "@/features/chat/types"
import { auth, firestore } from "@/lib/firebaseClient"
import { useMutation } from "@tanstack/react-query"
import { addDoc, collection } from "firebase/firestore"

const createMessage = async (payload: CreateMessagePayload) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const currentTimestamp = Date.now()

    return await addDoc(collection(firestore, "messages"), {
      ...payload,
      userId,
      modifiedAt: currentTimestamp,
      createdAt: currentTimestamp,
    })
  } catch (err) {
    console.log(err)
    throw new Error("Error while creating message")
  }
}

export const useCreateMessage = () => {
  const { mutate, ...restMutation } = useMutation(createMessage)

  return { createMessage: mutate, ...restMutation }
}
