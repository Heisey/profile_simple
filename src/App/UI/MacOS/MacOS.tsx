
import * as React from 'react'
import styled from "styled-components"

import { TerminalWindow } from "features/Terminal"
import { SafariMacOsWindow } from "features/Safari"
import { PdfReaderWindow } from "features/PdfReader"
import { FinderWindow } from "features/Finder"
import { AppStoreMacOsWindow } from "features/AppStore"
import { ContactMacOsWindow } from "features/Contact"
import { SettingsMacOsWindow } from "features/Settings"

import { NavBar } from "./layout/NavBar"
import { Hero } from "./layout/Hero"
import { Dock } from "./layout/Dock"

export const MacOS: React.FC = () => {
    
    return (
        <Main>
            <NavBar />
            <Hero />
            <Dock />

            <AppStoreMacOsWindow />
            <ContactMacOsWindow />
            <FinderWindow />
            <PdfReaderWindow />
            <SafariMacOsWindow />
            <SettingsMacOsWindow />
            <TerminalWindow />
        </Main>

    )
}

const Main = styled.main({
  width: "100dvw",
  overflow: "hidden",
  height: "100dvh",
  backgroundImage: 'url("/images/wallpaper.png")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
})
