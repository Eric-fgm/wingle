import { Typography } from "@/components"
import LazyLoad from "react-lazy-load"

export interface ChatWelcomeProps {
  createdAt: string
}

const ChatWelcome = ({ createdAt }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 text-center">
      <LazyLoad className="mx-auto inline-block">
        <img
          src="/assets/images/message-placeholder.png"
          alt="Message placeholder"
        />
      </LazyLoad>
      <Typography size="xs">
        Ten pokój został utworzony przez Ciebie w {createdAt}
      </Typography>
      <Typography variant="white" size="xs" className="mt-4 mb-1">
        HISTORIA JEST WŁĄCZONA
      </Typography>
      <Typography size="xs">
        Wiadomości wysyłane przy włączonej historii są zapisywane
      </Typography>
    </div>
  )
}

export default ChatWelcome
