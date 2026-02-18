// components/windows/BooksResumeWindow.tsx
import * as React from "react"
import styled from "styled-components"
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react"

import { Document, Page, pdfjs } from "react-pdf"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { resumes } from "config"
import type { ResumeDoc } from "types"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

// ✅ pdf worker (Vite friendly)
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

type Route = "library" | "reader"

const BooksResumeApp: React.FC = () => {
  const [route, setRoute] = React.useState<Route>("library")
  const [query, setQuery] = React.useState("")
  const [activeId, setActiveId] = React.useState<string>(resumes[0]?.id ?? "")

  const active = React.useMemo<ResumeDoc | undefined>(
    () => resumes.find((r) => r.id === activeId) ?? resumes[0],
    [activeId]
  )

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resumes
    return resumes.filter((r) => r.title.toLowerCase().includes(q))
  }, [query])

  // Reader state (same as your PDF window)
  const [numPages, setNumPages] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [zoom, setZoom] = React.useState<number>(1)

  // Reset page counts when switching docs
  React.useEffect(() => {
    if (route !== "reader") return
    setPage(1)
    setNumPages(0)
  }, [active?.file, activeId, route])

  const canPrev = page > 1
  const canNext = numPages > 0 && page < numPages

  const openReader = (id: string) => {
    setActiveId(id)
    setRoute("reader")
  }

  return (
    <Shell>
      <TopBar>
        {route === "reader" ? (
          <BackBtn onClick={() => setRoute("library")}>
            <ChevronLeft size={18} />
            Library
          </BackBtn>
        ) : (
          <TopTitle>Library</TopTitle>
        )}

        <TopActions>
          {route === "library" && (
            <IconBtn aria-label="Search">
              <Search size={18} />
            </IconBtn>
          )}
          <IconBtn aria-label="More">
            <MoreHorizontal size={18} />
          </IconBtn>
        </TopActions>
      </TopBar>

      {route === "library" ? (
        <Library>
          <SearchWrap>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search resumes"
            />
          </SearchWrap>

          <Grid>
            {filtered.map((r) => (
              <BookCard key={r.id} type="button" onClick={() => openReader(r.id)}>
                <Cover>
                  {/* "Books" cover mock: title on a card */}
                  <CoverInner>
                    <CoverTitle>{r.title}</CoverTitle>
                    <CoverSub>PDF</CoverSub>
                  </CoverInner>
                </Cover>

                <BookTitle title={r.title}>{r.title}</BookTitle>
              </BookCard>
            ))}
          </Grid>
        </Library>
      ) : (
        <Reader>
          <ReaderChrome>
            <ChromeLeft>
              <ChromeBtn
                disabled={!canPrev}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </ChromeBtn>

              <Stat>
                {page} / {numPages || "—"}
              </Stat>

              <ChromeBtn
                disabled={!canNext}
                onClick={() => setPage((p) => Math.min(numPages || p + 1, p + 1))}
                title="Next page"
              >
                <ChevronRight size={16} />
              </ChromeBtn>
            </ChromeLeft>

            <ChromeRight>
              <ChromeBtn
                disabled={zoom <= 0.6}
                onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
                title="Zoom out"
              >
                <Minus size={16} />
              </ChromeBtn>

              <Stat>{Math.round(zoom * 100)}%</Stat>

              <ChromeBtn
                disabled={zoom >= 2}
                onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
                title="Zoom in"
              >
                <Plus size={16} />
              </ChromeBtn>
            </ChromeRight>
          </ReaderChrome>

          <ReaderTitleWrap>
            <ReaderTitle title={active?.title}>{active?.title ?? "Document"}</ReaderTitle>
          </ReaderTitleWrap>

          <Viewer>
            <Document
              file={active?.file}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={<LoadText>Loading PDF…</LoadText>}
              error={<LoadText>Couldn’t load PDF.</LoadText>}
            >
              <Page pageNumber={page} scale={zoom} renderTextLayer renderAnnotationLayer />
            </Document>
          </Viewer>
        </Reader>
      )}
    </Shell>
  )
}

export const BooksIosWindow = IOSWindowWrapper(
  BooksResumeApp,
  "books",
)

/* ================= Styles ================= */

const Shell = styled.div({
  height: "42rem",
  display: "grid",
  gridTemplateRows: "3.25rem 1fr",
  background: "#f2f2f7", // iOS grouped bg
})

const TopBar = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 0.9rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(242,242,247,0.92)",
  backdropFilter: "blur(10px)",
})

const TopTitle = styled.div({
  fontWeight: 800,
  fontSize: "1.1rem",
  color: "#111827",
})

const BackBtn = styled.button({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.15rem",
  border: 0,
  background: "transparent",
  padding: "0.35rem 0.25rem",
  borderRadius: "0.6rem",
  fontWeight: 700,
  color: "#2563eb",
  cursor: "default",
})

const TopActions = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
})

const IconBtn = styled.button({
  border: 0,
  background: "transparent",
  width: "2.1rem",
  height: "2.1rem",
  borderRadius: "0.7rem",
  display: "grid",
  placeItems: "center",
  cursor: "default",
  color: "rgba(17,24,39,0.8)",
  ":active": { background: "rgba(0,0,0,0.05)" },
})

/* ================= Library ================= */

const Library = styled.div({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  overflow: "hidden",
})

const SearchWrap = styled.div({
  padding: "0.8rem 0.9rem 0.4rem",
})

const SearchInput = styled.input({
  width: "100%",
  borderRadius: "0.85rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(0,0,0,0.04)",
  padding: "0.65rem 0.85rem",
  outline: "none",
  fontWeight: 600,
  color: "#111827",
})

const Grid = styled.div({
  padding: "0.6rem 0.9rem 1.2rem",
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1rem 0.8rem",
  overflow: "auto",
})

const BookCard = styled.button({
  border: 0,
  background: "transparent",
  padding: 0,
  textAlign: "left",
  cursor: "default",
})

const Cover = styled.div({
  width: "100%",
  aspectRatio: "3 / 4",
  borderRadius: "0.9rem",
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.10)",
  boxShadow: "0 14px 28px rgba(0,0,0,0.12)",
  background: "#ffffff",
})

const CoverInner = styled.div({
  height: "100%",
  padding: "0.75rem",
  display: "grid",
  alignContent: "space-between",
  background: "linear-gradient(180deg,#ffffff,#f3f4f6)",
})

const CoverTitle = styled.div({
  fontWeight: 900,
  fontSize: "0.95rem",
  color: "#111827",
  lineHeight: 1.15,
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
})

const CoverSub = styled.div({
  fontWeight: 800,
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  color: "rgba(17,24,39,0.45)",
})

const BookTitle = styled.div({
  marginTop: "0.55rem",
  fontWeight: 700,
  fontSize: "0.85rem",
  color: "#111827",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

/* ================= Reader ================= */

const Reader = styled.div({
  overflow: "hidden",
  display: "grid",
  gridTemplateRows: "3.25rem auto 1fr",
})

const ReaderChrome = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.55rem 0.75rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(10px)",
})

const ChromeLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const ChromeRight = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const ChromeBtn = styled.button({
  width: "2rem",
  height: "2rem",
  display: "grid",
  placeItems: "center",
  borderRadius: "0.7rem",
  border: "1px solid rgba(0,0,0,0.10)",
  background: "#fff",
  cursor: "default",
  color: "#111827",
  ":active": { background: "rgba(0,0,0,0.04)" },
  ":disabled": { opacity: 0.4, cursor: "not-allowed" },
})

const Stat = styled.div({
  fontSize: "0.85rem",
  color: "rgba(17,24,39,0.65)",
  minWidth: "4.25rem",
  textAlign: "center",
  fontWeight: 700,
})

const ReaderTitleWrap = styled.div({
  padding: "0.65rem 0.9rem",
})

const ReaderTitle = styled.div({
  fontWeight: 900,
  fontSize: "0.95rem",
  color: "#111827",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const Viewer = styled.div({
  overflow: "auto",
  padding: "1rem",
  background: "#f2f2f7",
  display: "grid",
  justifyContent: "center",
})

const LoadText = styled.div({
  fontSize: "0.875rem",
  color: "#6b7280",
})
