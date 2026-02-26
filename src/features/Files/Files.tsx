// components/windows/ProjectsFilesIosWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import { mockFiles, mockFolders } from "config"

type FilesTheme = "light" | "dark"
const FILES_THEME: FilesTheme = "light"

const filesColors = (mode: FilesTheme) => {
  const light = {
    text: "#111827",
    subText: "rgba(17,24,39,0.55)",
    active: "rgba(0,0,0,0.04)",
    backText: "rgba(17,24,39,0.8)",
  }

  const dark = {
    text: "#ffffff",
    subText: "rgba(255,255,255,0.55)",
    active: "rgba(255,255,255,0.05)",
    backText: "rgba(255,255,255,0.9)",
  }

  return mode === "light" ? light : dark
}

type Folder = { id: string; name: string; icon: string }
type FileItem = { id: string; name: string; kind: string; date: string; icon: string }

type ViewState =
  | { view: "home" }
  | { view: "folder"; folderId: string; folderName: string }

type TileItem =
  | { type: "folder"; id: string; name: string }
  | { type: "file"; id: string; name: string; kind: string; date?: string; icon?: string }

const folderIconSrc = "/apple/FolderIcon.png"

const isFolderKind = (x: { kind?: string }) =>
  (x.kind ?? "").toLowerCase() === "folder"

const lensFolderItems = (folderName: string, all: FileItem[]): FileItem[] => {
  const folder = folderName.toLowerCase()

  if (folder.includes("projects")) {
    return all.filter((x) => {
      const n = x.name.toLowerCase()
      return (
        isFolderKind(x) ||
        n.includes("builder") ||
        n.includes("nexus") ||
        n.includes("project")
      )
    })
  }

  if (folder.includes("screenshots")) {
    return all.filter((x) => {
      const n = x.name.toLowerCase()
      return isFolderKind(x) || n.includes("screenshot") || n.includes("gallery")
    })
  }

  if (folder.includes("notes")) {
    return all.filter((x) => {
      const k = x.kind.toLowerCase()
      const n = x.name.toLowerCase()
      return k.includes("markdown") || k.includes("text") || n.includes("roadmap")
    })
  }

  // default: just folders
  return all.filter((x) => isFolderKind(x))
}

const FilesIosGridApp: React.FC = () => {

  const [state, setState] = React.useState<ViewState>({ view: "home" })

  const title = state.view === "folder" ? state.folderName : "Files"

  const goHome = () => setState({ view: "home" })

  const tiles: TileItem[] = React.useMemo(() => {
    if (state.view === "home") {
      return (mockFolders as Folder[]).map((f) => ({
        type: "folder",
        id: f.id,
        name: f.name,
      }))
    }

    const items = lensFolderItems(state.folderName, mockFiles as FileItem[])
    return items.map((x) =>
      isFolderKind(x)
        ? { type: "folder", id: x.id, name: x.name }
        : {
            type: "file",
            id: x.id,
            name: x.name,
            kind: x.kind,
            date: x.date,
            icon: x.icon,
          }
    )
  }, [state])

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
      </Header>

      <GridWrap>
        <Grid>
          {tiles.map((x) => {
            const meta =
              state.view === "home"
                ? "Folder"
                : x.type === "folder"
                  ? "Folder"
                  : `${x.kind}${x.date ? " • " + x.date : ""}`

            const onClick =
              x.type === "folder"
                ? () =>
                    setState({
                      view: "folder",
                      folderId: x.id,
                      folderName: x.name,
                    })
                : undefined

            return (
              <Tile
                key={x.id}
                type="button"
                onClick={onClick}
                aria-label={x.name}
                title={x.name}
              >
                <IconWrap aria-hidden>
                  {x.type === "folder" ? (
                    <FolderImg src={folderIconSrc} alt="" />
                  ) : (
                    <EmojiIcon>{x.icon ?? "📄"}</EmojiIcon>
                  )}
                </IconWrap>

                <Name>{x.name}</Name>
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

const BackBtn = styled.button(() => {
  const c = filesColors(FILES_THEME)
  return {
    border: 0,
    background: "transparent",
    color: c.backText,
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

const Tile = styled.button(() => {
  const c = filesColors(FILES_THEME)
  return {
    border: 0,
    background: "transparent",
    padding: "0.2rem 0.2rem",
    display: "grid",
    gap: "0.35rem",
    textAlign: "center",
    cursor: "default",
    ":active": { background: c.active, borderRadius: "0.9rem" },
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