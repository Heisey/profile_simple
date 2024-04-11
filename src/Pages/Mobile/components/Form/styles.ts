
import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 5.1rem);
  max-width: 80%;
  margin: 0 auto;
  
  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 2;

    & > :not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .buttons {
    margin-left: auto;
    margin-bottom: 2rem;

    & > * {
      transition: all 0.3s ease-in;
    }

    & > :not(:last-child) {
      margin-right: 1rem;
    }
  }
`