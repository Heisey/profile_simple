// components/icons/LaunchpadIcon.tsx
import * as React from "react"
import styled from "styled-components"

export type LaunchpadItem = { src: string; alt?: string }

export interface LaunchpadIconProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LaunchpadItem[]
}

export const LaunchpadIcon: React.FC<LaunchpadIconProps> = ({ items, className, ...rest }) => {
  const grid = React.useMemo(() => {
    const filled = items.slice(0, 9)
    while (filled.length < 9) filled.push({ src: "", alt: "" })
    return filled
  }, [items])

  return (
    <Shell className={className} aria-label="Launchpad" {...rest}>
      <Inner>
        <Grid>
          {grid.map((it, i) => (
            <Cell key={i}>
              {it.src ? (
                <MiniIcon src={it.src} alt={it.alt ?? ""} draggable={false} />
              ) : null}
            </Cell>
          ))}
        </Grid>

        <Dots aria-hidden="true">
          <Dot $active />
          <Dot />
          <Dot />
        </Dots>
      </Inner>

      <Gloss aria-hidden="true" />
      <Rim aria-hidden="true" />
    </Shell>
  )
}

/* ---------------- styles ---------------- */

const Shell = styled.div({
  width: "100%",
  height: "100%",
  borderRadius: "22%",
  overflow: "hidden",
  position: "relative",
  background:
    "linear-gradient(180deg, rgba(245,246,248,0.98), rgba(210,214,222,0.98))",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.80), inset 0 -10px 18px rgba(0,0,0,0.12)",
})

const Inner = styled.div({
  position: "absolute",
  inset: "7%",          // ✅ was 10%
  display: "flex",
  flexDirection: "column",
  gap: "6%",            // ✅ was 10%
})

const Grid = styled.div({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gap: "6%",            // ✅ was 10%
})

const Cell = styled.div({
  borderRadius: "26%",
  display: "grid",
  placeItems: "center",
  background: "rgba(255,255,255,0.28)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
})

const MiniIcon = styled.img({
  width: "92%",         // ✅ was 78%
  height: "92%",
  objectFit: "contain",
  display: "block",
  pointerEvents: "none",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.18))",
})

const Dots = styled.div({
  height: "8%",         // ✅ was 12%
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.28rem",
})

const Dot = styled.div<{ $active?: boolean }>((p) => ({
  width: "0.20rem",
  height: "0.20rem",
  borderRadius: 999,
  background: p.$active ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.18)",
}))

const Gloss = styled.div({
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at 30% 18%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%)",
  pointerEvents: "none",
})

const Rim = styled.div({
  position: "absolute",
  inset: 0,
  borderRadius: "22%",
  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
  pointerEvents: "none",
})
