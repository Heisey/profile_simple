
import styled from 'styled-components'

export const Desktop = styled.div`
  display: flex;
  align-items: center;

  & > * {
    fill: ${props => props.theme.typography.LIGHT};
    stroke: ${props => props.theme.typography.LIGHT};
  }

  :not(:last-child) {
    margin-right: 2rem;
  }

  :hover {
    transition: all 0.33s ease-in;
    fill: lime;
    stroke: lime;
  }

  .download {
    height: 28px;
  }

`