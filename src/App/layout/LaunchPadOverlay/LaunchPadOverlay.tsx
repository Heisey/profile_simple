// components/overlays/Launchpad.tsx
import * as React from "react"
import styled from "styled-components"
import { dockApps } from "config"
import { useGlobalStore } from "store"

export const Launchpad: React.FC = () => {
  const isOpen = useGlobalStore((s) => s.launchPadOpen)
  const close = useGlobalStore((s) => s.closeLauncPad)
  const openWindow = useGlobalStore((s) => s.openWindow)

  // Close on ESC
  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <Grid>
        {dockApps.map((app) => (
          <AppTile
            key={app.id}
            disabled={!app.canOpen}
            onClick={() => {
              openWindow(app.id as any, {})
              close()
            }}
          >
            <Icon>
              <img src={app.icon} alt={app.name} draggable={false} />
            </Icon>
            <Label>{app.name}</Label>
          </AppTile>
        ))}
      </Grid>
    </Overlay>
  )
}

const Overlay = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: 40, // below dock (dock is 50)
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  background: "rgba(0,0,0,0.15)",
  display: "grid",
  placeItems: "center",
})

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(6, 6rem)",
  gap: "2rem",
  justifyContent: "center",
})

const AppTile = styled.button({
  background: "transparent",
  border: 0,
  cursor: "pointer",
  display: "grid",
  justifyItems: "center",
  gap: "0.5rem",
  color: "#fff",
  fontSize: "0.85rem",

  ":disabled": { opacity: 0.4 },

  ":hover > div": {
    transform: "scale(1.08)",
  },
})

const Icon = styled.div({
  width: "5rem",
  height: "5rem",
  borderRadius: "1.25rem",
  display: "grid",
  placeItems: "center",
  background: "rgba(255,255,255,0.12)",
  boxShadow:
    "0 18px 35px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
  transition: "transform 120ms ease",

  "& img": {
    width: "82%",
    height: "82%",
    objectFit: "contain",
  },
})

const Label = styled.div({
  textShadow: "0 2px 6px rgba(0,0,0,0.6)",
})
