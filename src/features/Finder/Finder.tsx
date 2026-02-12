// components/windows/FinderWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import {
  Clock,
  FileText,
  FolderKanban,
  Search,
  LayoutGrid,
  List,
  Columns3,
  ChevronRight,
} from "lucide-react"

type FinderSection = "favorites" | "locations" | "tags"

type FinderItem = {
  id: string
  label: string
  icon: React.ReactNode
  section: FinderSection
}

type ViewMode = "icons" | "list" | "columns"

const Finder: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<string>("recents")
  const [view, setView] = React.useState<ViewMode>("icons")

  const selected = React.useMemo(
    () => sidebarItems.find((x) => x.id === selectedId),
    [selectedId]
  )

  return (
    <Shell>
      <Sidebar>
        <SidebarGroupLabel>Favorites</SidebarGroupLabel>

        <SidebarList>
          {sidebarItems
            .filter((x) => x.section === "favorites")
            .map((item) => (
              <SidebarRow
                key={item.id}
                $active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <IconSlot>{item.icon}</IconSlot>
                <span>{item.label}</span>
              </SidebarRow>
            ))}
        </SidebarList>

        <SidebarGroupLabel>Locations</SidebarGroupLabel>
        <SidebarList>
          {sidebarItems
            .filter((x) => x.section === "locations")
            .map((item) => (
              <SidebarRow
                key={item.id}
                $active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <IconSlot>{item.icon}</IconSlot>
                <span>{item.label}</span>
              </SidebarRow>
            ))}
        </SidebarList>

        <SidebarGroupLabel>Tags</SidebarGroupLabel>
        <SidebarList>
          {sidebarItems
            .filter((x) => x.section === "tags")
            .map((item) => (
              <SidebarRow
                key={item.id}
                $active={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <IconSlot>{item.icon}</IconSlot>
                <span>{item.label}</span>
              </SidebarRow>
            ))}
        </SidebarList>
      </Sidebar>

      <Main>
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

        <Body>
          {view === "icons" && (
            <IconGrid>
              {mockFiles.map((f) => (
                <IconCard key={f.id}>
                  <IconThumb>{f.icon}</IconThumb>
                  <IconName title={f.name}>{f.name}</IconName>
                </IconCard>
              ))}
            </IconGrid>
          )}

          {view === "list" && (
            <ListTable>
              <ListHeader>
                <span>Name</span>
                <span>Kind</span>
                <span>Date</span>
              </ListHeader>

              {mockFiles.map((f) => (
                <ListRow key={f.id}>
                  <ListName>
                    <SmallIcon>{f.icon}</SmallIcon>
                    <span>{f.name}</span>
                  </ListName>
                  <span>{f.kind}</span>
                  <span>{f.date}</span>
                </ListRow>
              ))}
            </ListTable>
          )}

          {view === "columns" && (
            <ColumnsShell>
              <Col>
                {mockFolders.map((folder) => (
                  <ColRow key={folder.id}>
                    <ColRowLeft>
                      <SmallIcon>{folder.icon}</SmallIcon>
                      <span>{folder.name}</span>
                    </ColRowLeft>
                    <ChevronRight size={16} opacity={0.6} />
                  </ColRow>
                ))}
              </Col>

              <Col>
                {mockFiles.slice(0, 7).map((f) => (
                  <ColRow key={f.id}>
                    <ColRowLeft>
                      <SmallIcon>{f.icon}</SmallIcon>
                      <span>{f.name}</span>
                    </ColRowLeft>
                    <span style={{ opacity: 0.55 }}>{f.kind}</span>
                  </ColRow>
                ))}
              </Col>

              <Preview>
                <PreviewCard>
                  <PreviewTitle>Preview</PreviewTitle>
                  <PreviewBody>
                    <div style={{ opacity: 0.65 }}>
                      Placeholder preview pane.
                    </div>
                    <div style={{ opacity: 0.65 }}>
                      You can wire this to your real content later.
                    </div>
                  </PreviewBody>
                </PreviewCard>
              </Preview>
            </ColumnsShell>
          )}
        </Body>
      </Main>
    </Shell>
  )
}

export const FinderWindow = WindowWrapper(Finder, "finder", "Finder")

/** ---------------- Data ---------------- */

const sidebarItems: FinderItem[] = [
  // Favorites (your picks)
  { id: "recents", label: "Recents", icon: <Clock size={16} />, section: "favorites" },
  { id: "resumes", label: "Resumes", icon: <FileText size={16} />, section: "favorites" },
  { id: "projects", label: "Projects", icon: <FolderKanban size={16} />, section: "favorites" },

  // Locations (safe defaults for a portfolio “filesystem”)
  { id: "portfolio", label: "Portfolio", icon: <span style={{ fontSize: 16 }}>🖥️</span>, section: "locations" },
  { id: "downloads", label: "Downloads", icon: <span style={{ fontSize: 16 }}>⬇️</span>, section: "locations" },
  { id: "docs", label: "Documents", icon: <span style={{ fontSize: 16 }}>📄</span>, section: "locations" },

  // Tags (nice looking, low commitment)
  { id: "tag-featured", label: "Featured", icon: <span style={{ fontSize: 16 }}>⭐</span>, section: "tags" },
  { id: "tag-ai", label: "AI", icon: <span style={{ fontSize: 16 }}>🤖</span>, section: "tags" },
  { id: "tag-web", label: "Web", icon: <span style={{ fontSize: 16 }}>🌐</span>, section: "tags" },
]

const mockFiles = [
  { id: "f1", name: "Resume – Tech Lead.pdf", kind: "PDF", date: "Today", icon: "📄" },
  { id: "f2", name: "Resume – Frontend.pdf", kind: "PDF", date: "Yesterday", icon: "📄" },
  { id: "f3", name: "Resume – Backend.pdf", kind: "PDF", date: "2 days ago", icon: "📄" },
  { id: "f4", name: "Builder – Case Study", kind: "Folder", date: "Last week", icon: "📁" },
  { id: "f5", name: "Nexus – Screenshots", kind: "Folder", date: "Last week", icon: "📁" },
  { id: "f6", name: "Project Roadmap.md", kind: "Markdown", date: "Last month", icon: "📝" },
  { id: "f7", name: "Contact.txt", kind: "Text", date: "Last month", icon: "📄" },
  { id: "f8", name: "Gallery", kind: "Folder", date: "Last month", icon: "📁" },
]

const mockFolders = [
  { id: "c1", name: "Resumes", icon: "📁" },
  { id: "c2", name: "Projects", icon: "📁" },
  { id: "c3", name: "Screenshots", icon: "📁" },
  { id: "c4", name: "Notes", icon: "📁" },
]

/** ---------------- Styles ---------------- */

const Shell = styled.div({
  display: "grid",
  gridTemplateColumns: "14rem 1fr",
  height: "42rem",
})

const Sidebar = styled.aside({
  borderRight: "1px solid #e5e7eb",
  background: "#f9fafb",
  overflow: "auto",
  padding: "0.75rem 0.6rem",
})

const SidebarGroupLabel = styled.div({
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#6b7280",
  marginTop: "0.4rem",
  marginBottom: "0.35rem",
})

const SidebarList = styled.div({
  display: "grid",
  gap: "0.15rem",
  marginBottom: "0.85rem",
})

const SidebarRow = styled.button<{ $active: boolean }>((p) => ({
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

const IconSlot = styled.div({
  width: "1.1rem",
  display: "grid",
  placeItems: "center",
  color: "#374151",
})

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff",
})

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

const Body = styled.div({
  flex: 1,
  overflow: "auto",
  background: "#ffffff",
})

/** Icon view */

const IconGrid = styled.div({
  padding: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))",
  gap: "0.85rem",
})

const IconCard = styled.div({
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "0.85rem",
  padding: "0.85rem",
  background: "#fff",
  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
})

const IconThumb = styled.div({
  width: "3rem",
  height: "3rem",
  borderRadius: "0.9rem",
  display: "grid",
  placeItems: "center",
  background: "rgba(0,0,0,0.04)",
  fontSize: "1.5rem",
})

const IconName = styled.div({
  marginTop: "0.6rem",
  fontSize: "0.9rem",
  color: "#111827",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

/** List view */

const ListTable = styled.div({
  padding: "0.5rem 0.75rem",
})

const ListHeader = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 9rem 8rem",
  gap: "0.75rem",
  padding: "0.55rem 0.45rem",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#6b7280",
  borderBottom: "1px solid rgba(0,0,0,0.10)",
})

const ListRow = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 9rem 8rem",
  gap: "0.75rem",
  padding: "0.55rem 0.45rem",
  borderRadius: "0.6rem",
  ":hover": { background: "rgba(0,0,0,0.04)" },
})

const ListName = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.55rem",
  color: "#111827",
})

const SmallIcon = styled.div({
  width: "1.2rem",
  display: "grid",
  placeItems: "center",
})

/** Column view */

const ColumnsShell = styled.div({
  display: "grid",
  gridTemplateColumns: "16rem 18rem 1fr",
  height: "100%",
})

const Col = styled.div({
  borderRight: "1px solid rgba(0,0,0,0.10)",
  padding: "0.55rem",
})

const ColRow = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  padding: "0.55rem 0.55rem",
  borderRadius: "0.65rem",
  ":hover": { background: "rgba(0,0,0,0.04)" },
})

const ColRowLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  color: "#111827",
})

const Preview = styled.div({
  padding: "1rem",
  background: "rgba(0,0,0,0.02)",
})

const PreviewCard = styled.div({
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "1rem",
  background: "#fff",
  padding: "1rem",
  boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
})

const PreviewTitle = styled.div({
  fontWeight: 800,
  fontSize: "0.95rem",
  color: "#111827",
  marginBottom: "0.5rem",
})

const PreviewBody = styled.div({
  display: "grid",
  gap: "0.35rem",
  color: "#374151",
})
