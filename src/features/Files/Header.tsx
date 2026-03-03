
import * as React from 'react'
import styled from 'styled-components'
import type { ViewState } from './state'

interface HeaderProps {
    pageView: ViewState
    setPageView: (args: ViewState) => void
}

export const Header: React.FC<HeaderProps> = (props) => {
    const { pageView, setPageView } = props

    const title = pageView.view === "folder" ? pageView.folderName : "Files"

    const goHome = () => setPageView({ view: "home" })

    return (
        <HeaderStyles>
            <HeaderLeft>
                <TitleRow>
                    {pageView.view === "folder" ? (
                        <BackBtn type="button" onClick={goHome}>
                            Back
                        </BackBtn>
                    ) : null}
                    <Title>{title}</Title>
                </TitleRow>
            </HeaderLeft>
        </HeaderStyles>
    )
}

const HeaderStyles = styled.div({
    padding: "1.1rem 1.1rem 0.65rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "1rem",
})

const HeaderLeft = styled.div({
    display: "grid",
    gap: "0.25rem",
    minWidth: 0,
})

const TitleRow = styled.div({
    display: "flex",
    alignItems: "baseline",
    gap: "0.65rem",
    minWidth: 0,
})

const Title = styled.div({
    fontSize: "2.35rem",
    fontWeight: 950,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
})

const BackBtn = styled.button({
    border: 0,
    background: "transparent",
    color: "rgba(17,24,39,0.8)",
    fontWeight: 950,
    fontSize: "1.05rem",
    letterSpacing: "-0.01em",
    padding: 0,
    cursor: "default",
    ":active": { opacity: 0.7 },
})
