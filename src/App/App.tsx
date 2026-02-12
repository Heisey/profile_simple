import * as React from "react"
import styled from "styled-components"

import { NavBar } from "./layout/NavBar"
import { Hero } from "./layout/Hero"
import { Dock } from "./layout/Dock"
import { TerminalWindow } from "features/Terminal"
import { SafariWindow } from "features/Safari"
import { PdfReaderWindow } from "features/PdfReader"
import { FinderWindow } from "features/Finder"
import { AppStoreWindow } from "features/AppStore"
import { ContactWindow } from "features/Contact"
import { SettingsWindow } from "features/Settings"
import { Launchpad } from "./layout/LaunchPadOverlay"

export const App: React.FC = () => {

  return (
    <Main>
      <NavBar />
      <Hero />
      <Dock />

      <Launchpad />

      <AppStoreWindow />
      <ContactWindow />
      <FinderWindow />
      <PdfReaderWindow />
      <SafariWindow />
      <SettingsWindow />
      <TerminalWindow />
    </Main>
  )
}

const Main = styled.main({
  width: "100dvw",
  height: "100dvh",
  overflow: "hidden",
})
