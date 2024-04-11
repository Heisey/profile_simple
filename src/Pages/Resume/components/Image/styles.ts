
import Styled from 'styled-components/'

export const Image = Styled.div`

  &:hover {
    .text {
      transition: all 0.3s ease-in;
      color: lime;
    }
  }

  .image {
    height: 120px;
    width: auto;
  }
`