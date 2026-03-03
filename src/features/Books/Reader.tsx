
import * as React from 'react'
import styled from 'styled-components'
import {
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
} from "lucide-react"
import { Document, Page } from "react-pdf"
import type { ResumeDoc } from 'types'

interface ReaderProps {
    page: number
    numPages: number
    active?: ResumeDoc

    setNumPages: (args: number) => void
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Reader: React.FC<ReaderProps> = (props) => {
    const { page, numPages, active, setNumPages, setPage } = props
    const [zoom, setZoom] = React.useState<number>(1)

    const canPrev = page > 1
    const canNext = numPages > 0 && page < numPages

    return (
        <ReaderStyles>
            <ReaderChrome>
                <ChromeLeft>
                    <ChromeBtn
                        disabled={!canPrev}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        title="Previous page"
                    >
                        <ChevronLeft size={16} />
                    </ChromeBtn>

                    <Stat>
                        {page} / {numPages || "—"}
                    </Stat>

                    <ChromeBtn
                        disabled={!canNext}
                        onClick={() => setPage((p) => Math.min(numPages || p + 1, p + 1))}
                        title="Next page"
                    >
                        <ChevronRight size={16} />
                    </ChromeBtn>
                </ChromeLeft>

                <ChromeRight>
                    <ChromeBtn
                        disabled={zoom <= 0.6}
                        onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
                        title="Zoom out"
                    >
                        <Minus size={16} />
                    </ChromeBtn>

                    <Stat>{Math.round(zoom * 100)}%</Stat>

                    <ChromeBtn
                        disabled={zoom >= 2}
                        onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
                        title="Zoom in"
                    >
                        <Plus size={16} />
                    </ChromeBtn>
                </ChromeRight>
            </ReaderChrome>

            <ReaderTitleWrap>
                <ReaderTitle title={active?.title}>{active?.title ?? "Document"}</ReaderTitle>
            </ReaderTitleWrap>

            <Viewer>
                <Document
                    file={active?.file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    loading={<LoadText>Loading PDF…</LoadText>}
                    error={<LoadText>Couldn’t load PDF.</LoadText>}
                >
                    <Page pageNumber={page} scale={zoom} renderTextLayer renderAnnotationLayer />
                </Document>
            </Viewer>
        </ReaderStyles>
    )
}

const ReaderStyles = styled.div({
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "3.25rem auto 1fr",
})

const ReaderChrome = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.55rem 0.75rem",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
})

const ChromeLeft = styled.div({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
})

const ChromeRight = styled.div({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
})

const ChromeBtn = styled.button({
    width: "2rem",
    height: "2rem",
    display: "grid",
    placeItems: "center",
    borderRadius: "0.7rem",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
    cursor: "default",
    color: "#111827",
    ":active": { background: "rgba(0,0,0,0.04)" },
    ":disabled": { opacity: 0.4, cursor: "not-allowed" },
})

const Stat = styled.div({
    fontSize: "0.85rem",
    color: "rgba(17,24,39,0.65)",
    minWidth: "4.25rem",
    textAlign: "center",
    fontWeight: 700,
})

const ReaderTitleWrap = styled.div({
    padding: "0.65rem 0.9rem",
})

const ReaderTitle = styled.div({
    fontWeight: 900,
    fontSize: "0.95rem",
    color: "#111827",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
})

const Viewer = styled.div({
    overflow: "auto",
    padding: "1rem",
    background: "#f2f2f7",
    display: "grid",
    justifyContent: "center",
})

const LoadText = styled.div({
    fontSize: "0.875rem",
    color: "#6b7280",
})
