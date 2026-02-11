
import * as React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components';

import { iconHover } from "utils"
import { navIcons } from 'config';

export const System: React.FC = () => {

    return (

        <SystemStyles>
            <ul>
                {navIcons.map(dataSet => (
                <li key={dataSet.id}><NavIconStyles key={dataSet.id} src={dataSet.img} alt={`icon-${dataSet.id}`} /></li>
                ))}
            </ul>

            <time>{ dayjs().format("ddd MMM D h:mm A")}</time>
        </SystemStyles>
    )
}

const SystemStyles = styled.div({
      display: "flex",
      alignItems: "center",
      gap: "1.25rem", // gap-5 = 20px

    "& ul": {
      display: "flex",
      alignItems: "center",
      gap: "1.25rem", // gap-5 = 20px
    }
})

const NavIconStyles = styled.img`
    ${iconHover}
`
