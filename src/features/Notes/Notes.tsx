
import * as React from "react"
import styled from "styled-components"

import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import type { ViewState } from "./state"
import { ListView } from "./ListView"
import { DetailView } from "./DetailView"

const NotesApp: React.FC = () => {
  const [notesViewState, notesViewStateHandler] = React.useState<ViewState>({ view: "list" })

  return (
    <NotesAppStyles>
      {notesViewState.view === "list" && <ListView setView={notesViewStateHandler} />}
      {notesViewState.view === "detail" && <DetailView viewState={notesViewState} setView={notesViewStateHandler}  />}
    </NotesAppStyles>
  )
}

export const NotesIosWindow = IOSWindowWrapper(NotesApp, "notes")

const NotesAppStyles = styled.div({
    width: "100%",
    height: "100%",
    minHeight: 0,
    color: "#111827",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  })
