
import Styled from 'styled-components'
import * as B from '@heisey/componentlib'

export const Button = Styled(B.Lib.Buttons.Button.Component)`
  border-color: lime;
  color: lime;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: lime;
    color: ${props => props.theme.button.PRIMARY.bg}
  }

  &:disabled {
    border-color: grey;
    color: grey;

    &:hover {
      background-color: transparent;
    }
  }
`