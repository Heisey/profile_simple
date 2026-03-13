
import * as React from 'react'
import styled from 'styled-components'

import { PROJECTS } from "config"

import { Detail } from "./Detail"
import type { View } from './types'
import { MainContent } from './MainContent'

interface BodyProps {
    view: View
    setView: (args: View) => void
    goBack: () => void
}

export const Body: React.FC<BodyProps> = (props) => {
    const {  view, setView, goBack } = props


    const openDetail = (id: string) => setView({ type: "detail", id })

    const active = React.useMemo(() => {
        if (view.type !== "detail") return null
        
        return PROJECTS.find((p) => p.id === view.id) ?? null
    }, [view])

    return (
        <Main>
            {view.type === "store" && <MainContent openDetail={openDetail} />}

            {view.type === "detail" && active && (
                <Detail
                    project={active}
                    onBack={goBack}
                    onOpenProject={(id) => openDetail(id)}
                />
            )}
        </Main>
    )
}


const Main = styled.main({
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: "#fff",
})

