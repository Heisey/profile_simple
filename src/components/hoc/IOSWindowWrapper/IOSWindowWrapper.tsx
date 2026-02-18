import { useGSAP } from "@gsap/react"
import * as React from "react"
import styled from "styled-components"

import { useGlobalStore } from "store"
import type { FeatureWindowKey } from "types"
import { gsap } from "utils"

type NamedComponent = { displayName?: string; name?: string }
function getComponentName<P>(C: React.ComponentType<P>) {
  const named = C as unknown as NamedComponent
  return named.displayName || named.name || "Component"
}

export function IOSWindowWrapper<P extends object>(
  Component: React.ComponentType<P>,
  windowKey: FeatureWindowKey,
  headerText?: React.ReactNode | string
) {
  type Props = P

  const Wrapped: React.FC<Props> = (componentProps) => {
    const win = useGlobalStore((s) => s.featureWindows[windowKey])
    const closeWindow = useGlobalStore((s) => s.closeWindow)

    const sectionRef = React.useRef<HTMLElement | null>(null)

    // open animation
    useGSAP(() => {
      const el = sectionRef.current
      if (!el || !win.isOpen) return

      el.style.display = "block"

      gsap.fromTo(
        el,
        { y: 30, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" }
      )
    }, [win.isOpen])

    React.useLayoutEffect(() => {
      const el = sectionRef.current
      if (!el) return
      el.style.display = win.isOpen ? "block" : "none"
      if (win.isOpen) el.style.transform = ""
    }, [win.isOpen])

    const handleClose = () => {
      const el = sectionRef.current
      if (!el) return

      gsap.to(el, {
        y: 80,
        opacity: 0,
        scale: 0.98,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => closeWindow(windowKey),
      })
    }

    const renderHeader = () => {
      if (!headerText) return null
      if (typeof headerText === "string") return <h2>{headerText}</h2>
      return headerText
    }

    return (
      <IOSFullScreen
        ref={sectionRef}
        id={windowKey}
        style={{ zIndex: win.zIndex }}
      >
        <IOSBody>
          <Component {...componentProps} />
        </IOSBody>

        <IOSBottomChrome>
          {headerText ? <IOSTitle>{renderHeader()}</IOSTitle> : null}

          {/* 👇 Click to close */}
          <Grabber
            role="button"
            aria-label="Close"
            onClick={handleClose}
          />
        </IOSBottomChrome>
      </IOSFullScreen>
    )
  }

  Wrapped.displayName = `IOSWindowWrapper(${getComponentName(Component)})`
  return Wrapped
}

/* ---------------- styles ---------------- */

const IOSFullScreen = styled.section({
  position: "fixed",
  inset: 0,
  overflow: "hidden",

  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",

  borderRadius: 0,
})

const IOSBody = styled.div({
  position: "absolute",
  inset: 0,
  overflow: "auto",
  WebkitOverflowScrolling: "touch",
  padding: "0.75rem 1rem",
  paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
})

const IOSBottomChrome = styled.div({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,

  paddingTop: "0.6rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",

  userSelect: "none",
  borderTop: "1px solid rgba(0,0,0,0.06)",

  background: "rgba(255,255,255,0.70)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
})

const Grabber = styled.div({
  width: "3.1rem",
  height: "0.32rem",
  borderRadius: "999px",
  margin: "0.35rem auto 0",
  background: "rgba(0,0,0,0.18)",
  cursor: "pointer",
})

const IOSTitle = styled.div({
  display: "grid",
  justifyItems: "center",

  "& > h2": {
    margin: 0,
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "rgba(17,24,39,0.85)",
    lineHeight: 1.1,
  },
})
