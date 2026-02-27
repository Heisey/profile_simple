
import * as React from 'react'
import styled from 'styled-components'

export const DifficultyDots: React.FC<{ value: 1 | 2 | 3 | 4 | 5 }> = ({ value }) => {
    return (
        <Dots aria-label={`Difficulty ${value} of 5`}>
            {new Array(5).fill(0).map((_, i) => (
                <Dot key={i} $on={i < value} />
            ))}
        </Dots>
    )
}


const Dots = styled.div({
    display: "flex",
    gap: "0.25rem",
})

const Dot = styled.div<{ $on: boolean }>((p) => ({
    width: "0.45rem",
    height: "0.45rem",
    borderRadius: "999px",
    background: p.$on ? "rgba(17,24,39,0.75)" : "rgba(0,0,0,0.14)",
}))
