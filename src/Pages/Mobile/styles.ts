
import styled from 'styled-components'

interface Props {
  overlayShown: boolean
}

export const Mobile = styled.div<Props>`
  background-color: ${props => props.theme.app.backgroundColor};
  height: 100dvh;
  width: 100vw;
  position: relative;
  overflow: hidden;

  &:after {
    content: 'H';
    visibility: ${props => props.overlayShown ? 'visible' : 'hidden'};
    font-size: 50px;
    background-color: lime;
    position: absolute;
    bottom: 75px;
    height: ${props => props.overlayShown ? '100%' : '0'};
    width: 100%;
    transition-delay: 0.1s;
    z-index: 1000;
    border-bottom: none;
    transition: all 0.3s ease-in;
    font-family: "BioRhyme Expanded", serif;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.app.backgroundColor};
  }

  .main {
    height: calc(100% - 4.9rem);
    position: relative;
  }

  .nav {
    position: absolute;
    background-color: lime;
    border-top: none;
    bottom: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & > * {
      width: 100%;
      position: relative;

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 5px;
        background-color: ${props => props.theme.app.backgroundColor};
      }
    }
  }

  .icon {
    /* padding-top: 1.5rem; */
    padding-left: 1.5rem;
    position: relative;

    & > * {
      font-family: "BioRhyme Expanded", serif;
      /* font-size: 3rem; */
      font-size: 50px;
      color: lime;
    }
  }

`