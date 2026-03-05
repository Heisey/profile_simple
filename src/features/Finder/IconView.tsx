
import * as React from 'react'
import styled from 'styled-components'
import { mockFiles } from 'config'

export const IconView: React.FC = () => {

  return (
    <IconGrid>
      {mockFiles.map((f) => (
        <IconCard key={f.id}>
          <IconThumb>{f.icon}</IconThumb>
          <IconName title={f.name}>{f.name}</IconName>
        </IconCard>
      ))}
    </IconGrid>
  )
}

const IconGrid = styled.div({
  padding: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))",
  gap: "0.85rem",
})

const IconCard = styled.div({
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "0.85rem",
  padding: "0.85rem",
  background: "#fff",
  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
})

const IconThumb = styled.div({
  width: "3rem",
  height: "3rem",
  borderRadius: "0.9rem",
  display: "grid",
  placeItems: "center",
  background: "rgba(0,0,0,0.04)",
  fontSize: "1.5rem",
})

const IconName = styled.div({
  marginTop: "0.6rem",
  fontSize: "0.9rem",
  color: "#111827",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})
