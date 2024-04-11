
import styled from 'styled-components'

export const StageOne = styled.div`
  text-align: center;

  .title {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }
  
  form {

    & > :not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  .submit {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 65%;
    display: block;
  }
`