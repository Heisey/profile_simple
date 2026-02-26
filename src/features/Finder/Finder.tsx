// components/windows/FinderWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import { FinderSidebar } from "./FinderSidebar"
import type { ViewMode } from "./types"
import { TopBar } from "./TopBar"
import { IconView } from "./IconView"
import { ListTable } from "./ListTable"
import { Columns } from "./Columns"
import { useGlobalStore } from "store"

const Finder: React.FC = () => {
  // const finderWindow = useGlobalStore(store => store.featureWindows.finder)
  const [selectedId, setSelectedId] = React.useState<string>("recents")
  const [view, setView] = React.useState<ViewMode>("icons")

  return (
    <Shell>
      <FinderSidebar selectedId={selectedId} setSelectedId={setSelectedId} />
      <Main>
        <TopBar 
          view={view}
          selectedId={selectedId}
          setView={setView}
        />

        <Body>
          {view === "icons" && <IconView />}

          {view === "list" && <ListTable />}

          {view === "columns" && <Columns />}
        </Body>
      </Main>
    </Shell>
  )
}

export const FinderWindow = WindowWrapper(Finder, "finder", "Finder")

const Shell = styled.div({
  display: "grid",
  gridTemplateColumns: "14rem 1fr",
  height: "42rem",
})

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff",
})

const Body = styled.div({
  flex: 1,
  overflow: "auto",
  background: "#ffffff",
})