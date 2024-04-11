
import Styled from 'styled-components'

export const Link = Styled.a`
  position: relative;
  font-size: 1.2rem;
  padding: 8px;
  color: white;
  text-decoration: none;

  &:after {
    transition: all 0.3s ease-in;
    position: absolute;
    content: '';
    top: calc(100% - 2px);
    left: 0;
    right: 0;
    bottom: 0;
    background-color: lime;
    z-index: -1;
  }

  &:hover {
    transition: all 0.15s ease-in;
    transition-delay: 0.1s;
    color: black;
    &:after {
      top: 0;
    }
  }
`