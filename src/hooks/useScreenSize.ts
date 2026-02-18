
import { useEffect, useState } from "react"

export type ScreenSize = Readonly<{
  width: number
  height: number
}>

const getSize = (): ScreenSize => {
  if (typeof window === "undefined") return { width: 0, height: 0 }
  return { width: window.innerWidth, height: window.innerHeight }
}

export const useScreenSize = (): ScreenSize => {
  const [size, setSize] = useState<ScreenSize>(() => getSize())

  useEffect(() => {
    // SSR safety
    if (typeof window === "undefined") return

    const onResize = (): void => {
      setSize(getSize())
    }

    window.addEventListener("resize", onResize, { passive: true })
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return size
}
