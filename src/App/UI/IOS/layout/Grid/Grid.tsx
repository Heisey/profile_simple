
import * as React from 'react'
import styled from 'styled-components'

import { DockIcon } from "components/base/Dock"
import { iosGridApps } from 'config'

export const Grid: React.FC = () => {

    return (
        <GridStyles>
          {iosGridApps.map(dataSet => <DockIcon showName {...dataSet} />)}
        </GridStyles>

    )
}

const GridStyles = styled.div({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: "7rem",

  padding: "1.25rem",

  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(6, 1fr)", // ✅ pick a row count you want visible
  gap: "0.75rem",

  justifyItems: "center",
  alignItems: "center",
})

