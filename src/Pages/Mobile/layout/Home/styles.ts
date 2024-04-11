
import styled from 'styled-components'

export const Home = styled.div`

  text-align: center;

  .title {
    font-size: 5rem;
    margin: 4rem auto;
  }

  .info {
    text-align: justify;
    padding: 0 3rem;

    & > :not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`