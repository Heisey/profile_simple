
import * as React from 'react'
import styled from 'styled-components'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton: React.FC<IconButtonProps> = (props) => {
    return <IconButtonStyles {...props} />
}

const IconButtonStyles = styled.button({
    border: 0,
    background: "transparent",
    width: "2.1rem",
    height: "2.1rem",
    borderRadius: "0.7rem",
    display: "grid",
    placeItems: "center",
    cursor: "default",
    color: "rgba(17,24,39,0.8)",
    ":active": { background: "rgba(0,0,0,0.05)" },
})
