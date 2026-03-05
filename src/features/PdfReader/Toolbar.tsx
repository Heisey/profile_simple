
import * as React from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import styled from 'styled-components'

interface ToolbarProps {
    numPages: number
    page: number
    zoom: number

    setPage: React.Dispatch<React.SetStateAction<number>>
    setZoom: React.Dispatch<React.SetStateAction<number>>
}

export const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { page, numPages, zoom, setPage, setZoom } = props

  const canPrev = page > 1
  const canNext = numPages > 0 && page < numPages

    return (
        <ToolbarStyles>
          <ToolbarLeft>
            <IconBtn
              disabled={!canPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </IconBtn>

            <PageStat>
              {page} / {numPages || "—"}
            </PageStat>

            <IconBtn
              disabled={!canNext}
              onClick={() => setPage((p) => Math.min(numPages || p + 1, p + 1))}
              title="Next page"
            >
              <ChevronRight size={16} />
            </IconBtn>
          </ToolbarLeft>

          <ToolbarRight>
            <IconBtn
              disabled={zoom <= 0.6}
              onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
              title="Zoom out"
            >
              <Minus size={16} />
            </IconBtn>

            <ZoomStat>{Math.round(zoom * 100)}%</ZoomStat>

            <IconBtn
              disabled={zoom >= 2}
              onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
              title="Zoom in"
            >
              <Plus size={16} />
            </IconBtn>
          </ToolbarRight>
        </ToolbarStyles>
    )
}


const ToolbarStyles = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 0.75rem",
  borderBottom: "1px solid #e5e7eb",
  background: "#ffffff",
})

const ToolbarLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const ToolbarRight = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const IconBtn = styled.button({
  width: "2rem",
  height: "2rem",
  display: "grid",
  placeItems: "center",
  borderRadius: "0.5rem",
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  color: "#111827",

  ":hover": { background: "#f9fafb" },
  ":disabled": { opacity: 0.4, cursor: "not-allowed" },
})

const PageStat = styled.div({
  fontSize: "0.875rem",
  color: "#374151",
  minWidth: "5rem",
  textAlign: "center",
})

const ZoomStat = styled.div({
  fontSize: "0.875rem",
  color: "#374151",
  minWidth: "4rem",
  textAlign: "center",
})