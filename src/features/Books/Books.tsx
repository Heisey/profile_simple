
import * as React from "react"
import styled from "styled-components"
import { pdfjs } from "react-pdf"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { resumes } from "config"
import type { ResumeDoc } from "types"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import { Library } from "./Library"
import type { Route } from "./types"
import { TopBar } from "./TopBar"
import { Reader } from "./Reader"

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const BooksResumeApp: React.FC = () => {
  const [route, setRoute] = React.useState<Route>("library")
  const [activeId, setActiveId] = React.useState<string>(resumes[0]?.id ?? "")
  const [numPages, setNumPages] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)

  const active = React.useMemo<ResumeDoc | undefined>(
    () => resumes.find((r) => r.id === activeId) ?? resumes[0],
    [activeId]
  )

  React.useEffect(() => {
    if (route !== "reader") return
    setPage(1)
    setNumPages(0)
  }, [active?.file, activeId, route])

  return (
    <BooksStyles>
      <TopBar 
        route={route}
        setRoute={setRoute}
      />

      {route === "library" && (
        <Library 
          setActiveId={setActiveId}
          setRoute={setRoute}
        />
      )}

      {route === "reader" && (
        <Reader 
          active={active}
          page={page}
          numPages={numPages}
          setNumPages={setNumPages}
          setPage={setPage}
        />
      )}
    </BooksStyles>
  )
}

export const BooksIosWindow = IOSWindowWrapper(
  BooksResumeApp,
  "books",
)

const BooksStyles = styled.div({
  height: "42rem",
  display: "grid",
  gridTemplateRows: "3.25rem 1fr",
  background: "#f2f2f7", // iOS grouped bg
})
