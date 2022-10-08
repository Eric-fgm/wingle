import debounce from "lodash.debounce"
import { useCallback, useEffect, useRef } from "react"

export const useScrollToBottom = (deps: ReadonlyArray<unknown> = []) => {
  const DOMElement = useRef<HTMLDivElement>()
  const autoScroll = useRef(true)

  const handleScroll = useCallback(
    debounce(({ target }: Event) => {
      if (!target) return
      const { scrollTop, scrollHeight, clientHeight } = target as HTMLDivElement

      if (scrollTop + clientHeight >= scrollHeight) autoScroll.current = true
      else autoScroll.current = false
    }, 100),
    []
  )

  useEffect(() => {
    if (!DOMElement.current) return

    if (autoScroll.current)
      DOMElement.current.scrollTo(0, DOMElement.current.scrollHeight)
  }, deps)

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        node.addEventListener("scroll", handleScroll)
      } else {
        DOMElement.current?.removeEventListener("scroll", handleScroll)
      }
      DOMElement.current = node
    },
    [handleScroll]
  )

  return { ref }
}
