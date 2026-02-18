
import * as React from 'react'
import styled from 'styled-components'
import { SmallIcon } from './styles'
import { mockFiles } from './config'

export const ListTable: React.FC = () => {

    return (
        <ListTableStyles>
              <ListHeader>
                <span>Name</span>
                <span>Kind</span>
                <span>Date</span>
              </ListHeader>

              {mockFiles.map((f) => (
                <ListRow key={f.id}>
                  <ListName>
                    <SmallIcon>{f.icon}</SmallIcon>
                    <span>{f.name}</span>
                  </ListName>
                  <span>{f.kind}</span>
                  <span>{f.date}</span>
                </ListRow>
              ))}
            </ListTableStyles>
    )
}

const ListTableStyles = styled.div({
  padding: "0.5rem 0.75rem",
})

const ListHeader = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 9rem 8rem",
  gap: "0.75rem",
  padding: "0.55rem 0.45rem",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#6b7280",
  borderBottom: "1px solid rgba(0,0,0,0.10)",
})

const ListRow = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 9rem 8rem",
  gap: "0.75rem",
  padding: "0.55rem 0.45rem",
  borderRadius: "0.6rem",
  ":hover": { background: "rgba(0,0,0,0.04)" },
})

const ListName = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.55rem",
  color: "#111827",
})