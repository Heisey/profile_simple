
import Styled from 'styled-components'

interface Props {
  titleSize: 'big' | 'small'
  isDesktop: boolean
}

export const Main = Styled.div<Props>`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  min-width: ${props => props.isDesktop ? '600px' : '400px'};
  max-width: ${props => props.isDesktop ? '700px' : '450px'};
  

  .main-text {
    border-left: 2px solid lime;
    padding-left: ${props => props.isDesktop ? '3rem' : '1.5rem'};

    & > :not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .title {
    font-size: ${props => props.titleSize === 'big' ? '5rem' : '2rem'};
    margin-top: ${props => props.titleSize === 'big' ? 0 : '-1rem'};
    margin-bottom: ${props => props.titleSize === 'big' ? '4rem' : '1rem'};
  }


  .left {
    width: ${props => props.isDesktop ? '60%' : '100%'};
  }

  .right {
    width: ${props => props.isDesktop ? '30%' : '0'};
  }

  .buttons {
    margin-top: 3rem;
    margin-left: 3rem;

    &>:not(:last-child) {
      margin-right: 3rem;
    }
  }

`