
import * as React from "react"
import styled from "styled-components"

import { WindowWrapper } from "components/hoc/WindowWrapper"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

import { Sidebar } from "./Sidebar"
import { Body } from "./Body"
import type { View } from "./types"
import { useGlobalStore } from "store"
import type { AppStoreWindowData, FeatureWindowConfg } from "types"

const AppStore: React.FC = () => {
    const appStoreWindow = useGlobalStore(store => store.featureWindows.appStore) as FeatureWindowConfg<AppStoreWindowData>
    const [view, setView] = React.useState<View>({ type: "store" })

    const goBack = () => setView({ type: "store" })

    // Checks if the window has data and populates that into the page
    React.useEffect(() => {
        if (!appStoreWindow.data?.project) return setView({ type: "store" })
        setView({ type: "detail", id: appStoreWindow.data.project })
    }, [appStoreWindow.data?.project, setView])

    return (
    <AppStoreStyles>
        <SidebarWrap>
            <Sidebar goBack={goBack} />
        </SidebarWrap>

        <BodyWrap>
            <Body view={view} setView={setView} goBack={goBack} />
        </BodyWrap>
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
    gridTemplateColumns: "17rem minmax(0, 1fr)",
    height: "100%",
    minHeight: 0,
    overflow: "hidden",

    "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
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

const BodyWrap = styled.div({
    minWidth: 0,
    minHeight: 0,
    overflow: "hidden",
    display: "flex",
})