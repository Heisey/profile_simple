
import styled from 'styled-components'

export const Project = styled.div`
  /* text-align: center; */
  padding: 0.5rem;
  /* display: flex;
  flex-direction: column; */
  height: 100%;

  .back {
    text-align: start;
    margin-left: 10%;
  }

  .title {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    margin: 3rem auto;
    max-width: 80%;
  }

  .info {
    text-align: justify;

    /* flex-grow: 2;
    max-height: 35rem; */
    height: calc(100% - 18rem);
    width: 80%;
    margin: 0 auto;

    &>:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .buttons {
    width: fit-content;
    /* margin-left: auto; */
    display: flex;
    /* padding-bottom: 3rem; */
    height: 3rem;
    width: 80%;
    margin: 0 auto;

    & > * {
      display: block;
      margin-left: auto;
    }

    & > :not(:last-child) {
      margin-right: 1rem
    }
  }
`