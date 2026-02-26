
import * as React from 'react'
import styled from 'styled-components'
import { sidebarItems } from './config'

interface FinderSidebarProps {
    selectedId: string
    setSelectedId: (args: string) => void
}

export const FinderSidebar: React.FC<FinderSidebarProps> = (props) => {
    const { selectedId, setSelectedId } = props

    return (
      <FinderSidebarStyles>
        <FinderSidebarGroupLabelStyles>Favorites</FinderSidebarGroupLabelStyles>
        <FinderSidebarListStyles>
          {sidebarItems
            .filter((x) => x.section === "favorites")
            .map((item) => (
              <FinderSidebarRowStyles
                key={item.id}
                $active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <FinderIconSlotStyles>{item.icon}</FinderIconSlotStyles>
                <span>{item.label}</span>
              </FinderSidebarRowStyles>
            ))}
        </FinderSidebarListStyles>

        <FinderSidebarGroupLabelStyles>Locations</FinderSidebarGroupLabelStyles>
        <FinderSidebarListStyles>
          {sidebarItems
            .filter((x) => x.section === "locations")
            .map((item) => (
              <FinderSidebarRowStyles
                key={item.id}
                $active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <FinderIconSlotStyles>{item.icon}</FinderIconSlotStyles>
                <span>{item.label}</span>
              </FinderSidebarRowStyles>
            ))}
        </FinderSidebarListStyles>

        <FinderSidebarGroupLabelStyles>Tags</FinderSidebarGroupLabelStyles>
        <FinderSidebarListStyles>
          {sidebarItems
            .filter((x) => x.section === "tags")
            .map((item) => (
              <FinderSidebarRowStyles
                key={item.id}
                $active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <FinderIconSlotStyles>{item.icon}</FinderIconSlotStyles>
                <span>{item.label}</span>
              </FinderSidebarRowStyles>
            ))}
        </FinderSidebarListStyles>
      </FinderSidebarStyles>
    )
}


const FinderSidebarStyles = styled.aside({
  borderRight: "1px solid #e5e7eb",
  background: "#f9fafb",
  overflow: "auto",
  padding: "0.75rem 0.6rem",
})

const FinderSidebarGroupLabelStyles = styled.div({
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#6b7280",
  marginTop: "0.4rem",
  marginBottom: "0.35rem",
})

const FinderSidebarListStyles = styled.div({
  display: "grid",
  gap: "0.15rem",
  marginBottom: "0.85rem",
})

const FinderSidebarRowStyles = styled.button<{ $active: boolean }>((p) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
  border: 0,
  background: p.$active ? "rgba(59, 130, 246, 0.14)" : "transparent",
  color: "#111827",
  padding: "0.38rem 0.45rem",
  borderRadius: "0.55rem",
  cursor: "default",
  userSelect: "none",
  textAlign: "left",
  fontSize: "0.9rem",
  ":hover": {
    background: p.$active ? "rgba(59, 130, 246, 0.14)" : "rgba(0,0,0,0.05)",
  },
}))

const FinderIconSlotStyles = styled.div({
  width: "1.1rem",
  display: "grid",
  placeItems: "center",
  color: "#374151",
})
