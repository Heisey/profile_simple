
import * as React from 'react'
import styled from 'styled-components'
import {
  Search
} from "lucide-react"
import type { Pane } from './types'

interface ToolbarProps {
    pane: Pane
    setPane: (args: Pane) => void
}

export const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { pane, setPane } = props

    return (
        <ToolbarStyles>
          <ToolbarLeft>
            <Seg>
              <SegBtn
                type="button"
                $active={pane === "card"}
                onClick={() => setPane("card")}
                aria-label="Card view"
              >
                Card
              </SegBtn>
              <SegBtn
                type="button"
                $active={pane === "socials"}
                onClick={() => setPane("socials")}
                aria-label="Socials view"
              >
                Socials
              </SegBtn>
            </Seg>
          </ToolbarLeft>

          <ToolbarRight>
            <IconBtn type="button" title="Search (placeholder)" aria-label="Search">
              <Search size={16} />
            </IconBtn>
          </ToolbarRight>
        </ToolbarStyles>
    )
}


const ToolbarStyles = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.55rem 0.75rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.92)",
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

const Seg = styled.div({
  display: "inline-flex",
  borderRadius: "0.9rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(0,0,0,0.03)",
  padding: "0.18rem",
})

const SegBtn = styled.button<{ $active: boolean }>((p) => ({
  border: 0,
  padding: "0.35rem 0.7rem",
  borderRadius: "0.75rem",
  cursor: "default",
  background: p.$active ? "#fff" : "transparent",
  boxShadow: p.$active ? "0 8px 18px rgba(0,0,0,0.10)" : "none",
  color: "#111827",
  fontWeight: 900,
  fontSize: "0.85rem",
}))

const IconBtn = styled.button({
  width: "2rem",
  height: "2rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.70)",
  display: "grid",
  placeItems: "center",
  cursor: "default",
  color: "#111827",
})
