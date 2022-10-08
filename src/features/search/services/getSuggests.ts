import useAuth from "@/features/auth/hooks/useAuth"
import type { MessageResponse } from "@/features/chat/types"
import { auth, firestore } from "@/lib/firebaseClient"
import { formatMessageTimestamp } from "@/utils/date"
import { useQuery } from "@tanstack/react-query"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore"
import { useMemo } from "react"

const getSuggests = async (value: string) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    const response = await getDocs(
      query(
        collection(firestore, "messages"),
        orderBy("content"),
        orderBy("createdAt", "desc"),
        where(`userId`, "==", userId),
        where("content", ">=", value),
        where("content", "<=", `${value}\uf8ff`),
        limit(150)
      )
    )

    return response
  } catch (err) {
    console.log(err)
    throw new Error("Error while getting suggests")
  }
}

export const useSuggestsQuery = (value: string) => {
  const { user } = useAuth()
  const { data, ...restQuery } = useQuery(
    ["suggests", value],
    () => getSuggests(value),
    { enabled: !!value, cacheTime: 0, keepPreviousData: true }
  )

  const suggests = useMemo(
    () =>
      data && user
        ? data.docs.map((suggestSnap) => {
            const suggestData = suggestSnap.data() as MessageResponse
            return {
              ...suggestData,
              id: suggestSnap.id,
              author: user,
              modifiedAt: formatMessageTimestamp(suggestData.modifiedAt),
              createdAt: formatMessageTimestamp(suggestData.createdAt),
            }
          })
        : [],
    [data, user]
  )

  return {
    suggests,
    hasSuggests: !!suggests.length,
    ...restQuery,
  }
}
