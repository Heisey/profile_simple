
import { useBreakpoint } from 'hooks/useBreakpoint'
import * as React from 'react'
import styled from 'styled-components'

interface DockTableProps extends React.PropsWithChildren {
    tableRef?: React.RefObject<HTMLDivElement | null>
}

export const DockTable: React.FC<DockTableProps> = (props) => {
    const { children, tableRef } = props

    const isMobile = useBreakpoint(500, "max")

    return (
        <DockTableStyles $isMobile={isMobile}>
            <TableStyles ref={tableRef} $isMobile={isMobile}>
                {children}
            </TableStyles>
        </DockTableStyles>
    )
}

const DockTableStyles = styled.section<{ $isMobile: boolean }>(
  ({ $isMobile }) => ({
    position: "absolute",
    bottom: "1.25rem",
    zIndex: 50,
    userSelect: "none",

    ...( $isMobile
      ? {
          left: "40px",
          right: "40px",
        }
      : {
          left: "50%",
          transform: "translateX(-50%)",
        }
    ),
  })
)

const TableStyles = styled.div<{ $isMobile: boolean }>(
  ({ $isMobile }) => ({
    display: "inline-flex",

    width: $isMobile ? "100%" : "fit-content",

    alignItems: "flex-end",
    justifyContent: "space-between",

    gap: "0.375rem",
    padding: "0.375rem",

    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(12px)",

    borderRadius: "1rem",
  })
)
