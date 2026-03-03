
import * as React from "react"
import styled from "styled-components"

import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import type { ViewState } from "./state"
import { Header } from "./Header"
import { Tiles } from "./Tiles"

const FilesIosGridApp: React.FC = () => {
  const [pageView, setPageView] = React.useState<ViewState>({ view: "home" })

  const commonProps = {
    pageView,
    setPageView
  }

  return (
    <FilesStyles>
      <Header { ...commonProps } />
      <GridWrap>
        <Grid>
          <Tiles { ...commonProps } />
        </Grid>
      </GridWrap>
    </FilesStyles>
  )
}

export const FilesIosWindow = IOSWindowWrapper(FilesIosGridApp, "files")

const FilesStyles = styled.div({
    width: "100%",
    height: "100%",
    minHeight: 0,
    color: "#111827",
    display: "grid",
    gridTemplateRows: "auto 1fr",
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
