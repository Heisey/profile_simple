
import * as React from 'react'
import { mockFiles, mockFolders } from './config'
import { SmallIcon } from './styles'

import {
  ChevronRight,
} from "lucide-react"
import styled from 'styled-components'

export const Columns: React.FC = () => {

    return (

            <ColumnsShell>
              <Col>
                {mockFolders.map((folder) => (
                  <ColRow key={folder.id}>
                    <ColRowLeft>
                      <SmallIcon>{folder.icon}</SmallIcon>
                      <span>{folder.name}</span>
                    </ColRowLeft>
                    <ChevronRight size={16} opacity={0.6} />
                  </ColRow>
                ))}
              </Col>

              <Col>
                {mockFiles.slice(0, 7).map((f) => (
                  <ColRow key={f.id}>
                    <ColRowLeft>
                      <SmallIcon>{f.icon}</SmallIcon>
                      <span>{f.name}</span>
                    </ColRowLeft>
                    <span style={{ opacity: 0.55 }}>{f.kind}</span>
                  </ColRow>
                ))}
              </Col>

              <Preview>
                <PreviewCard>
                  <PreviewTitle>Preview</PreviewTitle>
                  <PreviewBody>
                    <div style={{ opacity: 0.65 }}>
                      Placeholder preview pane.
                    </div>
                    <div style={{ opacity: 0.65 }}>
                      You can wire this to your real content later.
                    </div>
                  </PreviewBody>
                </PreviewCard>
              </Preview>
            </ColumnsShell>
    )
}


const ColumnsShell = styled.div({
  display: "grid",
  gridTemplateColumns: "16rem 18rem 1fr",
  height: "100%",
})

const Col = styled.div({
  borderRight: "1px solid rgba(0,0,0,0.10)",
  padding: "0.55rem",
})

const ColRow = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  padding: "0.55rem 0.55rem",
  borderRadius: "0.65rem",
  ":hover": { background: "rgba(0,0,0,0.04)" },
})

const ColRowLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  color: "#111827",
})

const Preview = styled.div({
  padding: "1rem",
  background: "rgba(0,0,0,0.02)",
})

const PreviewCard = styled.div({
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "1rem",
  background: "#fff",
  padding: "1rem",
  boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
})

const PreviewTitle = styled.div({
  fontWeight: 800,
  fontSize: "0.95rem",
  color: "#111827",
  marginBottom: "0.5rem",
})

const PreviewBody = styled.div({
  display: "grid",
  gap: "0.35rem",
  color: "#374151",
})
