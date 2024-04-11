
import Styled from 'styled-components'
import * as B from '@heisey/componentlib'

export const Modal = Styled(B.Lib.Layout.Modal.Component)`
  .body {
    padding: 1.5rem;
    min-width: 400px;
    color: ${props => props.theme.typography.LIGHT};


    .close {
      fill: ${props => props.theme.typography.LIGHT};
      stroke: ${props => props.theme.typography.LIGHT};
      transition: all 0.3s ease-in;

      &:hover {
        fill: lime;
        stroke: lime;
      }
    } 

    &:before {
      content: '';
      clip-path: polygon(
        0% 0%,
        0% 60%,
        1% 60%,
        1% 1%,
        40% 1%,
        40% 0%,
        0% 0%
      );
      background-color: lime;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }


    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0px;
      bottom: 0px;
      clip-path: polygon(
        100% 100%,
        100% 40%,
        99% 40%,
        99% 99%,
        60% 99%,
        60% 100%,
        100% 100%
      );
      background-color: lime;
      z-index: -1;
    }
  }

`