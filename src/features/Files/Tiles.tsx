
import * as React from 'react'
import type { ViewState } from './state'

import { mockFiles, mockFolders } from "config"
import styled from 'styled-components'

interface TileProps {
    pageView: ViewState
    setPageView: (args: ViewState) => void
}

export const Tiles: React.FC<TileProps> = (props) => {
    const { pageView, setPageView } = props

    const tiles: TileItem[] = React.useMemo(() => {
        if (pageView.view === "home") {
            return (mockFolders as Folder[]).map((f) => ({
                type: "folder",
                id: f.id,
                name: f.name,
            }))
        }

        const items = lensFolderItems(pageView.folderName, mockFiles as FileItem[])
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
    }, [pageView])

    return tiles.map((x) => {
        const meta =
            pageView.view === "home"
                ? "Folder"
                : x.type === "folder"
                    ? "Folder"
                    : `${x.kind}${x.date ? " • " + x.date : ""}`

        const onClick =
            x.type === "folder"
                ? () =>
                    setPageView({
                        view: "folder",
                        folderId: x.id,
                        folderName: x.name,
                    })
                : undefined

        return (
            <TilesStyles
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
            </TilesStyles>
        )
    })
}

type TileItem =
  | { type: "folder"; id: string; name: string }
  | { type: "file"; id: string; name: string; kind: string; date?: string; icon?: string }

type Folder = { id: string; name: string; icon: string }

type FileItem = { id: string; name: string; kind: string; date: string; icon: string }


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


const TilesStyles = styled.button({
    border: 0,
    background: "transparent",
    padding: "0.2rem 0.2rem",
    display: "grid",
    gap: "0.35rem",
    textAlign: "center",
    cursor: "default",
    ":active": { background: "rgba(0,0,0,0.04)", borderRadius: "0.9rem" },
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

const Meta = styled.div({
    fontSize: "0.88rem",
    fontWeight: 850,
    color: "rgba(17,24,39,0.55)",
    lineHeight: 1.15,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  })