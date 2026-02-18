import * as React from "react"
import styled from "styled-components"
import { Dock } from "./layout/Dock"
import { Grid } from "./layout/Grid"
import { ContactIosWindow } from "features/Contact"
import { SafariIosWindow } from "features/Safari"
import { AppStoreIosWindow } from "features/AppStore"
import { SettingsIosWindow } from "features/Settings"
import { BooksIosWindow } from "features/Books"
import { StocksIosWindow } from "features/Stocks"

export const IOS: React.FC = () => {
  return (
    <AppWrapperStyles>
      <Main>
        <AppStoreIosWindow />
        <BooksIosWindow />
        <ContactIosWindow />
        <SafariIosWindow />
        <SettingsIosWindow />
        <StocksIosWindow />

        <Grid />
        <Dock />
      </Main>
    </AppWrapperStyles>
  )
}

const AppWrapperStyles = styled.div({
  height: "100dvh",
  width: "100dvw",
  backgroundColor: "black",
})

const Main = styled.main({
  width: "100dvw",
  height: "100dvh",
  maxHeight: "1030px",

  backgroundImage: 'url("/images/ios.png")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  position: "relative",
  overflow: "hidden",
})
