import { useEffect, useState } from "react"

export type BreakpointDirection = "max" | "min"

export const useBreakpoint = (
  width: number,
  direction: BreakpointDirection = "max"
): boolean => {
  const getQuery = (): string =>
    direction === "max"
      ? `(max-width: ${width}px)`
      : `(min-width: ${width}px)`

  const getMatch = (): boolean => {
    if (typeof window === "undefined") return false
    return window.matchMedia(getQuery()).matches
  }

  const [matches, setMatches] = useState<boolean>(() => getMatch())

  useEffect(() => {
    if (typeof window === "undefined") return

    const media: MediaQueryList = window.matchMedia(getQuery())

    const onChange = (e: MediaQueryListEvent): void => {
      setMatches(e.matches)
    }

    setMatches(media.matches)

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [width, direction])

  return matches
}
