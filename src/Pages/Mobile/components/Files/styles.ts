
import styled from 'styled-components'

export const Files = styled.div`
  height: calc(100% - 7rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: lime;
  max-width: 90%;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 2;

    & > :not(:last-child) {
      margin-bottom: 2rem
    }
  }

  .file {
    text-align: center;
    
    a {
      text-decoration: none;
    }

    &__image {
      height: 150px;
      width: auto;
      margin-bottom: 0.5rem;
    }

    &__text {
      color: lime;
    }

  }


  .back {
    align-self: flex-end;
    justify-self: flex-end;
  }
`