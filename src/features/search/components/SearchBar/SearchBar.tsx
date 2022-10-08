import { Scroller, Typography } from "@/components"
import throttle from "lodash.throttle"
import React, { useCallback, useEffect, useState } from "react"
import { MdSearch } from "react-icons/md"
import { useSuggestsQuery } from "../../services/getSuggests"

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchBar: React.FC<SearchBarProps> = ({ className = "" }) => {
  const [searchValue, setSearchValue] = useState("")
  const [lazySearchValue, setLazySearchValue] = useState("")
  const [isFocused, setFocused] = useState(false)
  const { suggests, hasSuggests, isSuccess } = useSuggestsQuery(lazySearchValue)

  const search = useCallback(
    throttle((value: string) => {
      if (value.length < 1) return
      setLazySearchValue(value)
    }, 450),
    []
  )

  useEffect(() => {
    search(searchValue)
  }, [search, searchValue])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    [setSearchValue]
  )

  const handleFocus = useCallback(() => setFocused(true), [setFocused])

  const handleBlur = useCallback(() => setFocused(false), [setFocused])

  const preventDefault = useCallback(
    (event: { preventDefault: () => void }) => event.preventDefault(),
    []
  )

  return (
    <form
      className={`relative hidden w-full h-11 z-40 md:block lg:max-w-[580px] ${className}`}
      onSubmit={preventDefault}
    >
      <div className="bg-dominant rounded-lg">
        <label htmlFor="global-search" className="flex items-center h-11">
          <MdSearch className="ml-3 mr-2.5 flex-shrink-0 text-xl text-normal" />
          <input
            id="global-search"
            type="text"
            value={searchValue}
            placeholder="Szukaj serwerów, kanałów, itp."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full h-full font-sans text-sm bg-transparent outline-none placeholder:text-muted"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </label>
        {!!searchValue && isFocused && isSuccess && (
          <Scroller
            variant="camouflaged"
            className="py-2 border-t border-accent shadow-xl max-h-top-bar"
            onMouseDown={preventDefault}
          >
            {hasSuggests ? (
              <>
                <Typography size="rg" className="mb-1 px-4">
                  Wiadomości
                </Typography>
                {suggests.map(({ id, content }) => (
                  <div key={id}>
                    <Typography
                      size="sm"
                      variant="white"
                      className="mt-px py-1.5 px-4 hover:bg-hover"
                    >
                      {content}
                    </Typography>
                  </div>
                ))}
              </>
            ) : (
              <Typography size="sm" className="px-4">
                Nie znaleziono wyników.
              </Typography>
            )}
          </Scroller>
        )}
      </div>
    </form>
  )
}

export default React.memo(SearchBar)
