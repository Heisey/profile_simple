
import styled from 'styled-components'

interface Props {
  showMenu: boolean
}

export const Tablet = styled.div<Props>`

  /* position: relative; */

  .icon {
    fill: white;
    stroke: white;

    :hover {
      fill: lime;
      stroke: lime;
      transition: all 0.3s ease-in;
    }
  }

  .menu {
    position: absolute;
    height: ${props => props.showMenu ? 'calc(100% + 4rem)' : '0'};
    width: ${props => props.showMenu ? 'calc(100% + 4rem)' : '0'};
    background-color: lime;
    top: ${props => props.showMenu ? '-2rem' : '2rem'};
    left: ${props => props.showMenu ? '-2rem' : 'calc(100% - 2rem)'};
    transition: all 0.3s ease-in;
    z-index: 10000;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 2rem;
    opacity: ${props => props.showMenu ? 1 : 0};
    transition: all 0.3s ease-in;
    transition-delay: 0.4s;
  }

  .content {
    height: calc(100% - 10rem);
    visibility: ${props => props.showMenu ? 'visisble' : 'hidden'};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -3rem;

    ul {
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  .socialMedia {
    visibility: ${props => props.showMenu ? 'visisble' : 'hidden'};
    opacity: ${props => props.showMenu ? 1 : 0};
    transition: all 0.15s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    /* & > * {
      fill: red;
      stroke: red;
    } */

    & > * > * {
      fill: ${props => props.theme.app.backgroundColor};
      stroke: ${props => props.theme.app.backgroundColor};

      &:hover {
        fill: ${props => props.theme.typography.LIGHT};
        stroke: ${props => props.theme.typography.LIGHT};
        transition: all 0.3s ease-in;
      }
    }

    & > :not(:last-child) {
      margin-right: 2rem;
    }
  }
`

export const Item = styled.li`
  font-size: 1.5rem;

  &:hover {
    transform: scale(1.2);
    transition: all 0.3s ease-in;
  }
`