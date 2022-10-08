import { Typography } from "@/components"
import SolidChatPlaceholder from "@/icons/SolidChatPlaceholder"

const NotFoundGuildPlaceholder = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="-mt-12 text-center">
        <SolidChatPlaceholder className="mx-auto -mb-8" />
        <Typography size="md" variant="muted" weight="semibold">
          NIEZNALEZIONO TAKIEGO SERWERA
        </Typography>
        <Typography size="sm" variant="muted" className="mt-2 mb-4 max-w-lg">
          Znajdujesz się w dziwnym miejscu. Nie masz dostępu do żadnych kanałów
          tekstowych, lub nie istnieją żadne na tym serwerze.
        </Typography>
      </div>
    </div>
  )
}

export default NotFoundGuildPlaceholder
