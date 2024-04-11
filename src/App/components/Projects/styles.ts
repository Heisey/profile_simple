
import styled from 'styled-components'
import * as B from '@heisey/componentlib'

export const Projects = styled.ul`

  list-style: none;
  padding-left: 0;

  &>:not(:last-child) {
    margin-bottom: 1rem;
  }
`

interface Props {
  active: boolean
  large: boolean
}

const borderBottom = (args: Props) => {
  if (args.active) return '2px solid lime'
  return '2px solid transparent'
}

const color = (args: Props, theme: B.Core.I.Theme) => {
  if (args.large) return theme.app.backgroundColor
  else if (!args.active) return 'grey'
  return theme.typography.LIGHT
}

export const Item = styled.li<Props>`
  border-bottom: ${props => borderBottom(props)};
  padding-bottom: 4px;
  transition: all 0.3s ease-in;
  width: fit-content;

  :hover {
    color: ${props => props.theme.typography.LIGHT};
  }

  & > * {
    transition: all 0.3s ease-in;
    color: ${props => color(props, props.theme)};
    font-size: ${props => props.large ? '1.5rem' : '1rem'};
  }
`