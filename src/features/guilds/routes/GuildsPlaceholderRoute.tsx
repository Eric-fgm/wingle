import { Button, Typography } from "@/components"
import useModal from "@/features/modals/hooks/useModal"
import SolidChatPlaceholder from "@/icons/SolidChatPlaceholder"

const GuildsPlaceholderRoute = () => {
  const { openModal } = useModal("createGuild")

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="-mt-12 text-center">
        <SolidChatPlaceholder className="mx-auto -mb-8" />
        <Typography size="md" variant="muted" weight="semibold">
          WYBIERZ LUB UTWÓRZ SERWER
        </Typography>
        <Typography size="sm" variant="muted" className="mt-2 mb-4 max-w-lg">
          Znajdujesz się w dziwnym miejscu. Nie masz dostępu do żadnych kanałów
          tekstowych, lub nie istnieją żadne na tym serwerze.
        </Typography>
        <Button text="Stwórz serwer" onClick={openModal} />
      </div>
    </div>
  )
}

export default GuildsPlaceholderRoute
