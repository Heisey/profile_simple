import { useGSAP } from "@gsap/react"
import * as React from "react"

import { WindowControls } from 'components/custom/WindowControls';
import { useGlobalStore } from "store"
import type { FeatureWindowKey } from "types"
import { Draggable, gsap } from "utils"
import styled from "styled-components";

type NamedComponent = { displayName?: string; name?: string }

function getComponentName<P>(C: React.ComponentType<P>) {
  const named = C as unknown as NamedComponent
  return named.displayName || named.name || "Component"
}


const WINDOW_LAYOUT: Record<FeatureWindowKey, React.CSSProperties> = {
  terminal: {
    width: "36rem",          // w-xl
    top: "8rem",             // top-32
    left: "8.333333%",       // left-1/12
    backgroundColor: "#fff", // bg-white
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", // shadow-2xl
    borderRadius: "0.75rem", // rounded-xl
    overflow: "hidden",
  },

  safari: {
    width: "56rem",          // w-4xl
    top: "10rem",            // top-40
    left: "16.666667%",      // left-2/12
    backgroundColor: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    borderRadius: "0.75rem", // rounded-xl
    overflow: "hidden",
  },
  pdfReader: {
    width: "64rem",
    top: "9rem",
    left: "12.5%",
    backgroundColor: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    borderRadius: "0.75rem",
    overflow: "hidden",
  },
  // add others later (finder, safari, etc)
  finder: {},
  contact: {},
  resume: {},
  photos: {},
  txtfile: {},
  imgfile: {},
}

export function WindowWrapper<P extends object>(
  Component: React.ComponentType<P>,
  windowKey: FeatureWindowKey,
  headerText?: React.ReactNode | string
) {
  type Props = P

  const Wrapped: React.FC<Props> = (componentProps) => {
    const win = useGlobalStore((s) => s.featureWindows[windowKey])
    const focusWindow = useGlobalStore(s => s.focusWindow)
    const sectionRef = React.useRef<HTMLElement | null>(null)

    useGSAP(() => {
        const el = sectionRef.current

        if (!el || !win.isOpen) return

        el.style.display = "block"

        gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
        )
      }, [win.isOpen])

      useGSAP(() => {
        const el = sectionRef.current
        if (!el) return

        // only create draggable when visible/open
        if (!win.isOpen) return

        // ✅ create
        const [drag] = Draggable.create(el, {
            onPress: () => focusWindow(windowKey),
        })

        // ✅ cleanup (important in StrictMode + hot reload)
        return () => {
            drag?.kill()
        }
    }, { dependencies: [win.isOpen] })


    React.useLayoutEffect(() => {
      const el = sectionRef.current
      if (!el) return
      el.style.display = win.isOpen ? "block" : "none"
    }, [win.isOpen])

    const renderHeader = () => {
      if (!headerText) return

      if (typeof headerText === "string") return <h2>{headerText}</h2>

      return headerText
    }

    return (
      <section
        ref={sectionRef}
        id={windowKey}
        style={{
          position: "absolute",
          zIndex: win.zIndex,
          ...(WINDOW_LAYOUT[windowKey] ?? {}),
        }}
      >
        <HeaderStyles>
            <WindowControls windowKey={windowKey} />
            {renderHeader()}
        </HeaderStyles>
        <Component {...componentProps} />
      </section>
    )
  }

  Wrapped.displayName = `WindowWrapper(${getComponentName(Component)})`

  return Wrapped
}

const HeaderStyles = styled.div({
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",

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
    margin: "0 auto"
  },
})
