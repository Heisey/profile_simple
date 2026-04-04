
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import type { Pane } from "./types"
import { Sidebar } from "./Sidebar"
import { Toolbar } from "./Toolbar"
import { Card } from "./Card"
import { Socials } from "./Socials"

const ContactApp: React.FC = () => {
  const [pane, setPane] = React.useState<Pane>("card")

  const commonProps = {
    pane,
    setPane
  }

  return (
  <ContactStyles>
    <SidebarWrap>
      <Sidebar {...commonProps} />
    </SidebarWrap>

    <Main>
      <Toolbar {...commonProps} />

      <Body>
        {pane === "card" && <Card {...commonProps} />}
        {pane === "socials" && <Socials />}
      </Body>
    </Main>
  </ContactStyles>
)
}

export const ContactMacOsWindow = WindowWrapper(ContactApp, "contact", "Contacts")
export const ContactIosWindow = IOSWindowWrapper(ContactApp, "contact")
const ContactStyles = styled.div({
  display: "grid",
  gridTemplateColumns: "17rem minmax(0, 1fr)",
  height: "44rem",
  minHeight: 0,

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    height: "100%",
  },
})

const SidebarWrap = styled.div({
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",

  "@media (max-width: 768px)": {
    display: "none",
  },
})

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
  background: "#fff",
})

const Body = styled.div({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  background: "linear-gradient(180deg, rgba(249,250,251,1), rgba(255,255,255,1))",
  WebkitOverflowScrolling: "touch",
})