import { uploadThumbnail } from "@/features/guilds/services/uploadThumbnail"
import type { CreateGuildPayload } from "@/features/guilds/types"
import { auth, firestore } from "@/lib/firebaseClient"
import { BASE_ROUTES } from "@/utils/constans"
import { useMutation } from "@tanstack/react-query"
import { collection, doc, writeBatch } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const createGuild = async ({
  imageAsFile,
  ...data
}: CreateGuildPayload) => {
  try {
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("Unauthorized")

    let thumbnailUrl = ""

    const currentTimestamp = Date.now()
    const guildsRef = doc(collection(firestore, "guilds"))
    const userRef = doc(collection(firestore, "users"), userId)

    if (imageAsFile) {
      const uploadResult = await uploadThumbnail(guildsRef.id, imageAsFile)
      thumbnailUrl = uploadResult.ref.name
    }

    const batch = writeBatch(firestore)

    batch.set(guildsRef, {
      thumbnailUrl,
      roles: {
        admin: { read: true, create: true, update: true, delete: true },
        moderator: { read: true, create: true, update: true, delete: false },
        member: { read: true, create: false, update: false, delete: false },
        guest: { read: false, create: false, update: false, delete: false },
      },
      members: { [userRef.id]: "admin" },
      owner: userRef.id,
      modifiedAt: currentTimestamp,
      createdAt: currentTimestamp,
      ...data,
    })

    batch.update(userRef, {
      [`guilds.${guildsRef.id}`]: true,
    })

    const channelRef = doc(collection(firestore, "channels"))
    batch.set(channelRef, {
      name: "Kanał ogólny",
      isPrivate: false,
      guildId: guildsRef.id,
      modifiedAt: currentTimestamp,
      createdAt: currentTimestamp,
    })

    await batch.commit()

    return { guildId: guildsRef.id, channelId: channelRef.id }
  } catch (err) {
    console.log(err)

    throw new Error("Error while creating guild")
  }
}

export const useCreateGuildMutate = () => {
  const navigate = useNavigate()

  const { mutate, ...restMutation } = useMutation(createGuild, {
    onSuccess: async ({ guildId, channelId }) => {
      navigate(
        `${BASE_ROUTES.guilds}/${guildId}/${BASE_ROUTES.channels}/${channelId}`,
        {
          replace: true,
        }
      )
    },
  })

  return { createGuild: mutate, ...restMutation }
}
