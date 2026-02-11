
import * as React from 'react'
import { useGlobalStore } from 'store';
import styled from "styled-components";
import type { FeatureWindowKey } from 'types';

interface WindowControlsProps {
    windowKey: FeatureWindowKey
}

export const WindowControls: React.FC<WindowControlsProps> = (props) => {
    const { windowKey } = props
    const closeWindow = useGlobalStore(store => store.closeWindow)

    return (
        <WindowControlsStyles>
            <div className='close' onClick={() => closeWindow(windowKey)} />
            <div className='minimize' onClick={() => closeWindow(windowKey)} />
            <div className='maximize' />
        </WindowControlsStyles>
    )
}

const WindowControlsStyles = styled.div({
  display: "flex",
  gap: "0.5rem",

  "& .close": {
    width: "0.875rem",
    height: "0.875rem",
    borderRadius: "9999px",
    backgroundColor: "#ff6157",
    cursor: "pointer",
  },

  "& .minimize": {
    width: "0.875rem",
    height: "0.875rem",
    borderRadius: "9999px",
    backgroundColor: "#ffc030",
  },

  "& .maximize": {
    width: "0.875rem",
    height: "0.875rem",
    borderRadius: "9999px",
    backgroundColor: "#2acb42",
  },
})
