import { useGSAP } from "@gsap/react"
import * as React from "react"

import { WindowControls } from "components/custom/WindowControls"
import { useGlobalStore } from "store"
import type { FeatureWindowKey } from "types"
import { Draggable, gsap } from "utils"
import styled from "styled-components"
import { WINDOW_LAYOUT } from "config"

type NamedComponent = { displayName?: string; name?: string }

function getComponentName<P>(C: React.ComponentType<P>) {
  const named = C as unknown as NamedComponent
  return named.displayName || named.name || "Component"
}

export function WindowWrapper<P extends object>(
  Component: React.ComponentType<P>,
  windowKey: FeatureWindowKey,
  headerText?: React.ReactNode | string
) {
  type Props = P

  const Wrapped: React.FC<Props> = (componentProps) => {
    const win = useGlobalStore((s) => s.featureWindows[windowKey])
    const focusWindow = useGlobalStore((s) => s.focusWindow)
    const sectionRef = React.useRef<HTMLElement | null>(null)
    const headerRef = React.useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
      const el = sectionRef.current

      if (!el || !win.isOpen) return

      el.style.display = "flex"

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
      )
    }, [win.isOpen])

    useGSAP(() => {
      const el = sectionRef.current
      const header = headerRef.current

      if (!el || !header || !win.isOpen) return

      const [drag] = Draggable.create(el, {
        trigger: header,
        onPress: () => focusWindow(windowKey),
      })

      return () => {
        drag?.kill()
      }
    }, { dependencies: [win.isOpen] })

    React.useLayoutEffect(() => {
      const el = sectionRef.current
      if (!el) return
      el.style.display = win.isOpen ? "flex" : "none"
    }, [win.isOpen])

    const renderHeader = () => {
      if (!headerText) return null
      if (typeof headerText === "string") return <h2>{headerText}</h2>
      return headerText
    }

    return (
      <WindowShell
        ref={sectionRef}
        id={windowKey}
        $zIndex={win.zIndex}
        style={WINDOW_LAYOUT[windowKey] ?? {}}
      >
        <HeaderStyles ref={headerRef}>
          <WindowControls windowKey={windowKey} />
          {renderHeader()}
        </HeaderStyles>

        <WindowBody>
          <Component {...componentProps} />
        </WindowBody>
      </WindowShell>
    )
  }

  Wrapped.displayName = `WindowWrapper(${getComponentName(Component)})`

  return Wrapped
}

const WindowShell = styled.section<{ $zIndex: number }>(({ $zIndex }) => ({
  position: "absolute",
  zIndex: $zIndex,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minHeight: 0,
  minWidth: 0,

  maxWidth: "calc(100dvw - 1rem)",
  maxHeight: "calc(100dvh - 1rem)",

  borderRadius: "0.5rem",
  background: "#fff",
  boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
}))

const WindowBody = styled.div({
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  overflowY: "auto",
  overflowX: "hidden",
  WebkitOverflowScrolling: "touch",
  display: "flex",
  flexDirection: "column",

  scrollbarWidth: "none",      // Firefox
  msOverflowStyle: "none",     // old Edge/IE

  "&::-webkit-scrollbar": {
    display: "none",           // Chrome, Safari
  },
})

const HeaderStyles = styled.div({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,

  padding: "0.75rem 1rem",

  borderTopLeftRadius: "0.5rem",
  borderTopRightRadius: "0.5rem",

  backgroundColor: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",

  userSelect: "none",
  fontSize: "0.875rem",
  color: "#9ca3af",

  "& > p, & > h2": {
    margin: 0,
  },

  "& > h2": {
    fontWeight: 700,
    fontSize: "0.875rem",
    textAlign: "center",
    flex: 1,
    margin: "0 auto",
  },
})