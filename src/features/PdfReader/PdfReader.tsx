
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"

import { Document, Page, pdfjs } from "react-pdf"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { resumes } from "config"
import { Sidebar } from "./Sidebar"
import { Toolbar } from "./Toolbar"

// ✅ pdf worker (works in Vite + most bundlers)
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const PdfReader: React.FC = () => {
  const [activeResumeId, activeResumeIdHandler] = React.useState(resumes[0]?.id ?? "")
  const [numPages, setNumPages] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [zoom, setZoom] = React.useState<number>(1)

  const active = React.useMemo(
    () => resumes.find((r) => r.id === activeResumeId) ?? resumes[0],
    [activeResumeId]
  )

  React.useEffect(() => {
    setPage(1)
    setNumPages(0)
  }, [active?.file])

  return (
    <PdfReaderStyles>
      <Sidebar 
        activeResumeId={activeResumeId}
        activeResumeIdHandler={activeResumeIdHandler}
      />

      <Main>
        <Toolbar 
          numPages={numPages}
          page={page}
          zoom={zoom}
          setPage={setPage}
          setZoom={setZoom}
        />

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
    </PdfReaderStyles>
  )
}

export const PdfReaderWindow = WindowWrapper(PdfReader, "pdfReader", "Resume.pdf")

/* ---------------- styles ---------------- */

const PdfReaderStyles = styled.div({
  display: "grid",
  gridTemplateColumns: "16rem 1fr",
  height: "42rem", // window body height
})

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff",
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
