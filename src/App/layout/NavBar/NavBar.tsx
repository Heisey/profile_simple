
import * as React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { iconHover } from "utils"

const menuItems = [
    { id: 1, name: "Portfolio"},
    { id: 2, name: "Contact"},
    { id: 3, name: "Projects"},
]


const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

export const NavBar: React.FC = () => {

    return (
        <NavBarStyles>
            <div>
                <img src="/images/logo.svg" />
                <p>Heisey's Portfolio</p>
                <ul>
                    {menuItems.map(dataSet => (
                        <li key={dataSet.id}><p>{dataSet.name}</p></li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(dataSet => (
                        <li key={dataSet.id}><NavIconStyles key={dataSet.id} src={dataSet.img} alt={`icon-${dataSet.id}`} /></li>
                    ))}
                </ul>
                
                <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>

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

  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem", // gap-5 = 20px


    "& > p": {
        fontWeight: "bold"
    },

    "& > ul": {
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",

        "@media (max-width: 640px)": {
            display: "none"
        }
    },

    "& > ul p": {
        fontSize: "0.875rem",
        cursor: "pointer",
        transition: "all 0.2s ease"
    },

    "& > ul p:hover": {
        textDecoration: "underline"
    },

    "@media (max-width: 640px)": {
      width: "100%",
      justifyContent: "center"
    }
  },

  "& > div:last-child": {
    "@media (max-width: 640px)": {
      display: "none"
    }
  }
})

const NavIconStyles = styled.img`
    ${iconHover}
`