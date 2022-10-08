import { getProfile } from "@/features/auth/services/getProfile"
import { signIn } from "@/features/auth/services/signIn"
import { signOut } from "@/features/auth/services/signOut"
import { signUp } from "@/features/auth/services/signUp"
import type { UserSession } from "@/features/auth/types"
import { userSession } from "@/utils/storage"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

const useAuth = () => {
  const queryClient = useQueryClient()

  const { data: session } = useQuery(["session"], userSession.get, {
    initialData: userSession.get,
  })

  const clearQueryCache = useCallback(() => {
    queryClient.setQueryData<UserSession | null>(["session"], () => null)
    queryClient.clear()
    userSession.remove()
  }, [queryClient])

  const { data: user, isLoading } = useQuery(["auth"], getProfile, {
    enabled: !!session,
    suspense: true,
    onError: () => {
      clearQueryCache()
    },
  })

  const { mutate: trySignUp, isLoading: isSigningUp } = useMutation(signUp, {
    onSuccess: (session) => {
      queryClient.setQueryData<UserSession | null>(["session"], () => session)
      userSession.set(session)
    },
  })

  const { mutate: trySignIn, isLoading: isSigningIn } = useMutation(signIn, {
    onSuccess: (session) => {
      queryClient.setQueryData<UserSession | null>(["session"], () => session)
      userSession.set(session)
    },
  })

  const { mutate: trySignOut } = useMutation(signOut, {
    onSuccess: () => {
      clearQueryCache()
    },
  })

  return {
    user,
    session,
    isLoading,
    isLoggedIn: !!session,
    isSigningIn,
    isSigningUp,
    signOut: trySignOut,
    signIn: trySignIn,
    signUp: trySignUp,
  }
}

export default useAuth
