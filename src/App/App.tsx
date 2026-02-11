import * as React from "react"
import styled from "styled-components"

import { NavBar } from "./layout/NavBar"
import { Hero } from "./layout/Hero"
import { Dock } from "./layout/Dock"
import { TerminalWindow } from "features/Terminal"
import { SafariWindow } from "features/Safari"
import { ResumeWindow } from "features/Resume"
import { PdfReaderWindow } from "features/PdfReader/PdfReader"
import { useGlobalStore } from "store"

export const App: React.FC = () => {
  const featureWindow = useGlobalStore(store => store.featureWindows)

  console.log("puppy windows, ", featureWindow)
  return (
    <Main>
      <NavBar />
      <Hero />
      <Dock />

      <PdfReaderWindow />
      <ResumeWindow />
      <SafariWindow />
      <TerminalWindow />
    </Main>
  )
}

const Main = styled.main({
  width: "100dvw",
  height: "100dvh",
  overflow: "hidden",
})
