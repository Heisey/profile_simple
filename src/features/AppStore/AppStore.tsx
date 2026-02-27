
import * as React from "react"
import styled from "styled-components"

import { WindowWrapper } from "components/hoc/WindowWrapper"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import { Sidebar } from "./Sidebar"
import { Body } from "./Body"
import type { View } from "./types"

const AppStore: React.FC = () => {
    const [view, setView] = React.useState<View>({ type: "store" })
    const [query, setQuery] = React.useState("")

    const goBack = () => setView({ type: "store" })

    return (
        <AppStoreStyles>
            <Sidebar query={query} setQuery={setQuery} goBack={goBack} />
            <Body view={view} setView={setView} query={query} goBack={goBack} />
        </AppStoreStyles>
    )
}

export const AppStoreMacOsWindow = WindowWrapper(
    AppStore,
    "appStore", 
    "App Store"
)

export const AppStoreIosWindow = IOSWindowWrapper(AppStore, "appStore")

const AppStoreStyles = styled.div({
    display: "grid",
    gridTemplateColumns: "17rem 1fr",
    height: "48rem"
})
