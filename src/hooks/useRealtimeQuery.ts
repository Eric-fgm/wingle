import {
  hashQueryKey,
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from "@tanstack/react-query"
import type {
  DocumentData,
  FirestoreError,
  Query,
  QuerySnapshot,
  Unsubscribe
} from "firebase/firestore"
import { onSnapshot } from "firebase/firestore"
import { useCallback, useMemo } from "react"

type NextOrObserver<T> = (data: QuerySnapshot<T>) => void

const unsubscribeMap: Record<
  string,
  { queryKey: QueryKey; unsubscribe: Unsubscribe }
> = {}

export function useRealtimeQuery<T = DocumentData>(
  queryKey: QueryKey,
  query: Query<T>,
  options?: Omit<
    UseQueryOptions<QuerySnapshot<T>, FirestoreError>,
    "queryKey" | "queryFn" | "initialData"
  > & {
    initialData?: () => undefined
    optimisticUpdate?: boolean
    optionalParams?: Record<string, unknown>
  }
) {
  const mainQueryKey = options?.optionalParams
    ? queryKey.concat(options?.optionalParams)
    : queryKey

  const queryClient = useQueryClient()

  const hashedQueryKey = useMemo(() => hashQueryKey(queryKey), [queryKey])

  const cleanup = useCallback(() => {
    if (unsubscribeMap[hashedQueryKey]) {
      unsubscribeMap[hashedQueryKey]!.unsubscribe()
      queryClient.removeQueries(unsubscribeMap[hashedQueryKey]!.queryKey)
      delete unsubscribeMap[hashedQueryKey]
    }
  }, [hashedQueryKey, queryClient])

  const subscribeFn = useCallback(
    (
      callback: NextOrObserver<T>,
      errorCallback?: (err: FirestoreError) => void
    ) => {
      cleanup()

      const unsubscribe = onSnapshot(
        query,
        {
          includeMetadataChanges: true,
        },
        {
          next: (snapshot: QuerySnapshot<T>) => {
            // console.log(queryKey, snapshot.metadata)

            if (
              !options?.optimisticUpdate &&
              (snapshot.metadata.hasPendingWrites ||
                snapshot.metadata.fromCache)
            )
              return

            return callback(snapshot)
          },
          error: (err) => {
            console.log(err)
            cleanup()
            if (errorCallback) errorCallback(err)
          },
        }
      )

      unsubscribeMap[hashedQueryKey] = {
        queryKey: mainQueryKey,
        unsubscribe,
      }

      return unsubscribe
    },
    [query, mainQueryKey, hashedQueryKey, options, cleanup]
  )

  return useQuery(
    mainQueryKey,
    () =>
      new Promise<QuerySnapshot<T>>((resolve, reject) => {
        subscribeFn(
          (snapshot) => {
            console.log(mainQueryKey, queryKey, snapshot.docs)

            queryClient.setQueryData(mainQueryKey, () => snapshot)
            resolve(snapshot)
          },
          (err) => reject(err)
        )
      }),
    options
  )
}
