import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import { ChevronLeft, ChevronRight, Minus, Plus, FileText } from "lucide-react"

import { Document, Page, pdfjs } from "react-pdf"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { resumes } from "config"

// ✅ pdf worker (works in Vite + most bundlers)
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const PdfReader: React.FC = () => {
  const [activeId, setActiveId] = React.useState(resumes[0]?.id ?? "")
  const active = React.useMemo(
    () => resumes.find((r) => r.id === activeId) ?? resumes[0],
    [activeId]
  )

  const [numPages, setNumPages] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [zoom, setZoom] = React.useState<number>(1)

  React.useEffect(() => {
    setPage(1)
    setNumPages(0)
  }, [active?.file])

  const canPrev = page > 1
  const canNext = numPages > 0 && page < numPages

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <FileText size={16} />
          <span>Resumes</span>
        </SidebarHeader>

        <List>
          {resumes.map((r) => {
            const selected = r.id === activeId
            return (
              <ListItem
                key={r.id}
                $selected={selected}
                onClick={() => setActiveId(r.id)}
                title={r.title}
              >
                {r.title}
              </ListItem>
            )
          })}
        </List>
      </Sidebar>

      <Main>
        <Toolbar>
          <ToolbarLeft>
            <IconBtn
              disabled={!canPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </IconBtn>

            <PageStat>
              {page} / {numPages || "—"}
            </PageStat>

            <IconBtn
              disabled={!canNext}
              onClick={() => setPage((p) => Math.min(numPages || p + 1, p + 1))}
              title="Next page"
            >
              <ChevronRight size={16} />
            </IconBtn>
          </ToolbarLeft>

          <ToolbarRight>
            <IconBtn
              disabled={zoom <= 0.6}
              onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
              title="Zoom out"
            >
              <Minus size={16} />
            </IconBtn>

            <ZoomStat>{Math.round(zoom * 100)}%</ZoomStat>

            <IconBtn
              disabled={zoom >= 2}
              onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
              title="Zoom in"
            >
              <Plus size={16} />
            </IconBtn>
          </ToolbarRight>
        </Toolbar>

        <Viewer>
          <Document
            file={active?.file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<LoadText>Loading PDF…</LoadText>}
            error={<LoadText>Couldn’t load PDF.</LoadText>}
          >
            <Page
              pageNumber={page}
              scale={zoom}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </Viewer>
      </Main>
    </Shell>
  )
}

export const PdfReaderWindow = WindowWrapper(PdfReader, "pdfReader", "Resume.pdf")

/* ---------------- styles ---------------- */

const Shell = styled.div({
  display: "grid",
  gridTemplateColumns: "16rem 1fr",
  height: "42rem", // window body height
})

const Sidebar = styled.aside({
  borderRight: "1px solid #e5e7eb",
  background: "#f9fafb",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
})

const SidebarHeader = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 0.75rem",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "0.875rem",
  fontWeight: 700,
  color: "#374151",
})

const List = styled.div({
  padding: "0.5rem",
  overflow: "auto",
})

const ListItem = styled.button<{ $selected?: boolean }>(({ $selected }) => ({
  width: "100%",
  textAlign: "left",
  border: "1px solid transparent",
  borderRadius: "0.5rem",
  padding: "0.6rem 0.65rem",
  cursor: "pointer",
  fontSize: "0.875rem",
  background: $selected ? "#e5e7eb" : "transparent",
  color: "#111827",
  transition: "background 120ms ease",

  ":hover": { background: $selected ? "#e5e7eb" : "#f3f4f6" },
}))

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff",
})

const Toolbar = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 0.75rem",
  borderBottom: "1px solid #e5e7eb",
  background: "#ffffff",
})

const ToolbarLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const ToolbarRight = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const IconBtn = styled.button({
  width: "2rem",
  height: "2rem",
  display: "grid",
  placeItems: "center",
  borderRadius: "0.5rem",
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  color: "#111827",

  ":hover": { background: "#f9fafb" },
  ":disabled": { opacity: 0.4, cursor: "not-allowed" },
})

const PageStat = styled.div({
  fontSize: "0.875rem",
  color: "#374151",
  minWidth: "5rem",
  textAlign: "center",
})

const ZoomStat = styled.div({
  fontSize: "0.875rem",
  color: "#374151",
  minWidth: "4rem",
  textAlign: "center",
})

const Viewer = styled.div({
  flex: 1,
  overflow: "auto",
  padding: "1rem",
  background: "#f3f4f6",
  display: "grid",
  justifyContent: "center",
})

const LoadText = styled.div({
  fontSize: "0.875rem",
  color: "#6b7280",
})
