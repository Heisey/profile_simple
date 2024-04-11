
import styled from 'styled-components'

export const Projects = styled.div`


  margin-top: 5rem;

  text-align: center;
  
  .title {
    font-size: 3rem;
  }

  .list {
    margin-top: 3rem;
    text-align: start;

    li {
      border-top: 1px solid lime;

      &:last-child {
        border-bottom: 1px solid lime;
      }
    }
  }

  .projectList {
    padding: 0.5rem;

    &__title {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 1.2rem;
    }

    &__desc {
      font-size: 0.8rem;
    }

    &__button {
      margin-left: auto;
      display: block;

      & > * {
        color: lime;
        font-size: 1rem;
      }
    }
  }
`