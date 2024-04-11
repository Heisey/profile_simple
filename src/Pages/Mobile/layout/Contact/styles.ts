
import styled from 'styled-components'

export const Contact = styled.div`
  padding: 0.5rem;
  height: 100%;
  
  .main {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    :first-child {
      margin-top: -10rem;
    }

    :not(:last-child) {
      margin-bottom: 5rem;
    }
  }

  .email {
    height: 100%;
  }

  .success,
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 6.1rem);
    color: white;
    
    .message {
      font-size: 2rem;
    }

    .visual {
      fill: lime;
      stroke: lime;
    }

    & > :not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`