import * as React from "react"
import { useGlobalStore } from "store"
import styled from "styled-components"
import type { DockApp } from "types"

interface DockIconProps extends DockApp {
  /** Show the app name under the icon (for home screen / grids) */
  showName?: boolean
}

export const DockIcon: React.FC<DockIconProps> = (props) => {
  const { icon, id, canOpen = true, name, showName = false } = props
  const openWindow = useGlobalStore((store) => store.openWindow)

  const button = (
    <DockIconStyles
      type="button"
      aria-label={name}
      data-dock-icon
      data-tooltip-id="dock-tooltip"
      data-tooltip-content={name}
      data-tooltip-delay-show={500}
      disabled={!canOpen}
      $canOpen={canOpen}
      onClick={() => openWindow(id, {})}
    >
      <img src={icon} alt={name} />
    </DockIconStyles>
  )

  if (!showName) return button

  return (
    <IconWithName>
      {button}
      <IconName title={name} aria-hidden>
        {name}
      </IconName>
    </IconWithName>
  )
}

interface DockIconStylesProps {
  $canOpen: boolean
}

const DockIconStyles = styled.button<DockIconStylesProps>((props) => ({
  width: "3.5rem",
  height: "3.5rem",
  cursor: "pointer",
  padding: 0,
  border: 0,
  background: "transparent",
  appearance: "none",
  WebkitAppearance: "none",
  lineHeight: 0,
  display: "grid",
  placeItems: "center",

  "--dock-safe": "78%",

  "@media (min-width: 1920px)": {
    width: "5rem",
    height: "5rem",
  },

  "& > *": {
    width: "var(--dock-safe)",
    height: "var(--dock-safe)",
  },

  "& img, & svg": {
    width: "var(--dock-safe)",
    height: "var(--dock-safe)",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
    opacity: props.$canOpen ? 1 : 0.6,
    pointerEvents: "none",
  },

  "&:disabled": {
    cursor: "default",
    opacity: 0.5,
  },
}))

/* ================= Label wrapper (non-dock use) ================= */

const IconWithName = styled.div({
  display: "grid",
  justifyItems: "center",
  alignContent: "start",
  gap: "0.35rem",
  userSelect: "none",
  WebkitUserSelect: "none",
})

const IconName = styled.div({
  maxWidth: "6.75rem", // feels like iOS truncation
  fontSize: "0.78rem",
  fontWeight: 600,
  lineHeight: 1.15,
  letterSpacing: "-0.01em",
  textAlign: "center",
  color: "rgba(255,255,255,0.92)", // iOS home screen vibe; override in parent if needed
  textShadow: "0 1px 2px rgba(0,0,0,0.35)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  pointerEvents: "none",
})
