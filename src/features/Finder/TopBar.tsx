
import * as React from 'react'
import styled from 'styled-components'
import {
  Search,
  LayoutGrid,
  List,
  Columns3,
} from "lucide-react"
import { sidebarItems } from './config'
import type { ViewMode } from './types'

interface TopBarProps {
    selectedId: string
    view: ViewMode
    setView: (args: ViewMode) => void
}

export const TopBar: React.FC<TopBarProps> = (props) => {
    const { selectedId, view, setView } = props

  const selected = React.useMemo(
    () => sidebarItems.find((x) => x.id === selectedId),
    [selectedId]
  )

    return (
        <Topbar>
            <Crumb>
            <CrumbTitle>{selected?.label ?? "Finder"}</CrumbTitle>
            </Crumb>

            <TopbarRight>
            <TopbarIconBtn title="Search (coming soon)">
                <Search size={16} />
            </TopbarIconBtn>

            <Divider />

            <TopbarIconBtn
                aria-pressed={view === "icons"}
                $active={view === "icons"}
                title="Icon view"
                onClick={() => setView("icons")}
            >
                <LayoutGrid size={16} />
            </TopbarIconBtn>

            <TopbarIconBtn
                aria-pressed={view === "list"}
                $active={view === "list"}
                title="List view"
                onClick={() => setView("list")}
            >
                <List size={16} />
            </TopbarIconBtn>

            <TopbarIconBtn
                aria-pressed={view === "columns"}
                $active={view === "columns"}
                title="Column view"
                onClick={() => setView("columns")}
            >
                <Columns3 size={16} />
            </TopbarIconBtn>
            </TopbarRight>
        </Topbar>
    )
}

const Topbar = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.55rem 0.75rem",
  borderBottom: "1px solid #e5e7eb",
  background: "#ffffff",
})

const Crumb = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const CrumbTitle = styled.div({
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#111827",
})

const TopbarRight = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
})

const Divider = styled.div({
  width: 1,
  height: "1.2rem",
  background: "rgba(0,0,0,0.12)",
  marginInline: "0.25rem",
})

const TopbarIconBtn = styled.button<{ $active?: boolean }>((p) => ({
  width: "2rem",
  height: "2rem",
  display: "grid",
  placeItems: "center",
  borderRadius: "0.55rem",
  border: "1px solid rgba(0,0,0,0.10)",
  background: p.$active ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.70)",
  cursor: "default",
  color: "#111827",
  ":hover": {
    background: p.$active ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.05)",
  },
}))
