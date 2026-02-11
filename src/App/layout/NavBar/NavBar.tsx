
import * as React from 'react'
import styled from 'styled-components'

import { Menu } from './Menu'
import { System } from './System'

export const NavBar: React.FC = () => {

  return (
    <NavBarStyles>
      <Menu />
      <p className='user'>Heisey's Portfolio</p>
      <System />
    </NavBarStyles>
  )
}


const NavBarStyles = styled.nav({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.5)",
  backdropFilter: "blur(64px)",
  padding: "0.5rem 1.25rem",
  userSelect: "none",

  "& .user": {
    fontWeight: "bold"
  }
})
