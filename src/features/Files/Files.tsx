// components/windows/ProjectsFilesIosWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { Search, MoreHorizontal } from "lucide-react"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

// adjust path to where these live
import { mockFiles, mockFolders } from "config"

type FilesTheme = "light" | "dark"
const FILES_THEME: FilesTheme = "light" // wire to global theme later

const filesColors = (mode: FilesTheme) => {
  const light = {
    text: "#111827",
    subText: "rgba(17,24,39,0.55)",
    pillBg: "rgba(0,0,0,0.06)",
    pillBorder: "rgba(0,0,0,0.08)",
    pillText: "rgba(17,24,39,0.8)",
    dotBg: "rgba(0,0,0,0.06)",
    active: "rgba(0,0,0,0.04)",
  }

  const dark = {
    text: "#ffffff",
    subText: "rgba(255,255,255,0.55)",
    pillBg: "rgba(255,255,255,0.12)",
    pillBorder: "rgba(255,255,255,0.12)",
    pillText: "rgba(255,255,255,0.9)",
    dotBg: "rgba(255,255,255,0.10)",
    active: "rgba(255,255,255,0.05)",
  }

  return mode === "light" ? light : dark
}

type Folder = { id: string; name: string; icon: string }
type FileItem = { id: string; name: string; kind: string; date: string; icon: string }

type ViewState =
  | { view: "home" }
  | { view: "folder"; folderId: string; folderName: string }

const folderIconSrc = "/apple/FolderIcon.png"

const isFolder = (x: { kind?: string }) => (x.kind ?? "").toLowerCase() === "folder"

const FilesIosGridApp: React.FC = () => {
  const [state, setState] = React.useState<ViewState>({ view: "home" })
  const [q, setQ] = React.useState("")

  const title = state.view === "folder" ? state.folderName : "Files"

  const goHome = () => setState({ view: "home" })
  const openFolder = (f: Folder) =>
    setState({ view: "folder", folderId: f.id, folderName: f.name })

  const folders = React.useMemo(() => {
    const query = q.trim().toLowerCase()
    const all = mockFolders as Folder[]
    if (!query) return all
    return all.filter((x) => x.name.toLowerCase().includes(query))
  }, [q])

  const folderItems = React.useMemo(() => {
    // You only have a flat list, so we do a simple “folder lens”.
    // Replace later with a real tree if you want.
    const all = mockFiles as FileItem[]
    if (state.view !== "folder") return []

    const folder = state.folderName.toLowerCase()
    let items = all

    if (folder.includes("projects")) {
      items = all.filter((x) => {
        const n = x.name.toLowerCase()
        return (
          isFolder(x) ||
          n.includes("builder") ||
          n.includes("nexus") ||
          n.includes("project")
        )
      })
    } else if (folder.includes("screenshots")) {
      items = all.filter((x) => {
        const n = x.name.toLowerCase()
        return isFolder(x) || n.includes("screenshot") || n.includes("gallery")
      })
    } else if (folder.includes("notes")) {
      items = all.filter((x) => {
        const k = x.kind.toLowerCase()
        const n = x.name.toLowerCase()
        return k.includes("markdown") || k.includes("text") || n.includes("roadmap")
      })
    } else {
      items = all.filter((x) => isFolder(x))
    }

    const query = q.trim().toLowerCase()
    if (!query) return items
    return items.filter((x) => (x.name + " " + x.kind).toLowerCase().includes(query))
  }, [q, state])

  const visibleTiles = state.view === "home" ? folders : folderItems

  return (
    <Shell>
      <Header>
        <HeaderLeft>
          <TitleRow>
            {state.view === "folder" ? (
              <BackBtn type="button" onClick={goHome}>
                Back
              </BackBtn>
            ) : null}
            <Title>{title}</Title>
          </TitleRow>
        </HeaderLeft>

        <HeaderRight>
          <SearchPill>
            <Search size={18} />
            <SearchInput
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            <DotBtn aria-label="More">
              <MoreHorizontal size={18} />
            </DotBtn>
          </SearchPill>
        </HeaderRight>
      </Header>

      <GridWrap>
        <Grid>
          {visibleTiles.map((x: any) => {
            const folder = state.view === "home" ? true : isFolder(x)
            const name: string = x.name
            const meta: string =
              state.view === "home" ? "Folder" : `${x.kind}${x.date ? " • " + x.date : ""}`

            const onClick =
              state.view === "home"
                ? () => openFolder(x as Folder)
                : folder
                  ? () => {
                      // allow nesting “folder” items: treat them as “openable”
                      setState({ view: "folder", folderId: x.id, folderName: x.name })
                    }
                  : undefined

            return (
              <Tile
                key={x.id}
                type="button"
                onClick={onClick}
                $clickable={Boolean(onClick)}
                aria-label={name}
                title={name}
              >
                <IconWrap aria-hidden>
                  {folder ? (
                    <FolderImg src={folderIconSrc} alt="" />
                  ) : (
                    <EmojiIcon>{x.icon ?? "📄"}</EmojiIcon>
                  )}
                </IconWrap>

                <Name>{name}</Name>
                <Meta>{meta}</Meta>
              </Tile>
            )
          })}
        </Grid>
      </GridWrap>
    </Shell>
  )
}

export const FilesIosWindow = IOSWindowWrapper(FilesIosGridApp, "files")

/* ---------------- styles ---------------- */

const Shell = styled.div(() => {
  const c = filesColors(FILES_THEME)
  return {
    width: "100%",
    height: "100%",
    minHeight: 0,
    // IMPORTANT: no background here (uses whatever your window provides)
    color: c.text,
    display: "grid",
    gridTemplateRows: "auto 1fr",
  }
})

const Header = styled.div({
  padding: "1.1rem 1.1rem 0.65rem",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
})

const HeaderLeft = styled.div({
  display: "grid",
  gap: "0.25rem",
  minWidth: 0,
})

const TitleRow = styled.div({
  display: "flex",
  alignItems: "baseline",
  gap: "0.65rem",
  minWidth: 0,
})

const Title = styled.div({
  fontSize: "2.35rem",
  fontWeight: 950,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const HeaderRight = styled.div({
  marginTop: "0.15rem",
})

const SearchPill = styled.div(() => {
  const c = filesColors(FILES_THEME)
  return {
    height: "2.6rem",
    borderRadius: "999px",
    background: c.pillBg,
    border: `1px solid ${c.pillBorder}`,
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    padding: "0 0.8rem",
    color: c.pillText,
    minWidth: "14rem",
  }
})

const SearchInput = styled.input(() => {
  const c = filesColors(FILES_THEME)
  return {
    appearance: "none",
    border: 0,
    outline: "none",
    background: "transparent",
    color: c.text,
    fontSize: "1.05rem",
    fontWeight: 850,
    width: "10rem",
    "::placeholder": { color: c.subText, fontWeight: 850 },
  }
})

const DotBtn = styled.div(() => {
  const c = filesColors(FILES_THEME)
  return {
    width: "2.05rem",
    height: "2.05rem",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    background: c.dotBg,
    color: c.text,
    flex: "0 0 auto",
  }
})

const BackBtn = styled.button(() => {
  const c = filesColors(FILES_THEME)
  return {
    border: 0,
    background: "transparent",
    color: c.pillText,
    fontWeight: 950,
    fontSize: "1.05rem",
    letterSpacing: "-0.01em",
    padding: 0,
    cursor: "default",
    ":active": { opacity: 0.7 },
  }
})

const GridWrap = styled.div({
  minHeight: 0,
  overflow: "auto",
  padding: "0.4rem 0.9rem 1.1rem",
})

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "0.95rem 0.8rem",
})

const Tile = styled.button<{ $clickable: boolean }>(() => {
  const c = filesColors(FILES_THEME)
  return {
    border: 0,
    background: "transparent",
    padding: "0.2rem 0.2rem",
    display: "grid",
    gap: "0.35rem",
    textAlign: "center",
    cursor: "default",
    opacity: 1,
    ":active": { background: c.active, borderRadius: "0.9rem" },
    ...(FILES_THEME ? {} : {}),
  }
})

const IconWrap = styled.div({
  width: "100%",
  display: "grid",
  placeItems: "center",
})

const FolderImg = styled.img({
  width: "3.4rem",
  height: "3.4rem",
  objectFit: "contain",
})

const EmojiIcon = styled.div({
  fontSize: "2.25rem",
  lineHeight: 1,
  transform: "translateY(1px)",
})

const Name = styled.div({
  fontSize: "0.98rem",
  fontWeight: 950,
  letterSpacing: "-0.01em",
  lineHeight: 1.15,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
})

const Meta = styled.div(() => {
  const c = filesColors(FILES_THEME)
  return {
    fontSize: "0.88rem",
    fontWeight: 850,
    color: c.subText,
    lineHeight: 1.15,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }
})