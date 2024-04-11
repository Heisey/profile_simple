
import Styled from 'styled-components'

interface Props {
  isDesktop: boolean
}

export const App = Styled.div<Props>`
  background-color: ${props => props.theme.app.backgroundColor};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;;
  position: relative;

  .card {
    padding: 3rem;
    position: relative;
    height: 600px;
    min-width: 800px;
    min-width: ${props => props.isDesktop ? '800px' : '400px'};
    max-width: ${props => props.isDesktop ? '900px' : '450px'};
    z-index: 10;

    &:before {
      content: '';
      background:  
        linear-gradient(to right, lime 4px, transparent 4px) 0 100%,
        linear-gradient(to bottom, lime 4px, transparent 4px) 100% 0;
      position: absolute;
      top: -30px;
      left: -30px;
      right: 40%;
      bottom: 40%;
      z-index: -1;
    }

    &:after {
      content: '';
      position: absolute;
      top: 40%;
      left: 40%;
      right: -30px;
      bottom: -30px;
      background: 
        linear-gradient(to left, lime 4px, transparent 4px) 100% 0,
        linear-gradient(to top, lime 4px, transparent 4px) 100% 100%;
      z-index: -1;
    }
  }
`