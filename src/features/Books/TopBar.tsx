
import * as React from 'react'
import styled from 'styled-components'
import {
    ChevronLeft,
    Search,
    MoreHorizontal,
} from "lucide-react"
import type { Route } from './types'
import { IconButton } from 'components/base/IconButton'

interface TopBarProps {
    route: Route
    setRoute: (args: Route) => void
}

export const TopBar: React.FC<TopBarProps> = (props) => {
    const { route, setRoute } = props

    return (
        <TopBarStyles>
            {route === "reader" ? (
                <BackBtn onClick={() => setRoute("library")}>
                    <ChevronLeft size={18} />
                    Library
                </BackBtn>
            ) : (
                <h3 className='title'>Library</h3>
            )}

            <div className='actions'>
                {route === "library" && (
                    <IconButton aria-label="Search">
                        <Search size={18} />
                    </IconButton>
                )}
                <IconButton aria-label="More">
                    <MoreHorizontal size={18} />
                </IconButton>
            </div>
        </TopBarStyles>
    )
}

const TopBarStyles = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 0.9rem",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    backdropFilter: "blur(10px)",

    "& .title": {
        fontWeight: 800,
        fontSize: "1.1rem",
        color: "#111827",
    },

    "& .actions": {
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
    }
})

const BackBtn = styled.button({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.15rem",
    border: 0,
    background: "transparent",
    padding: "0.35rem 0.25rem",
    borderRadius: "0.6rem",
    fontWeight: 700,
    color: "#2563eb",
    cursor: "default",
})

