
import Styled from 'styled-components'
import * as B from '@heisey/componentlib'

export const Label = Styled(B.Lib.Inputs.Label.Component)`
  .field {
    color: ${props => props.theme.typography.LIGHT};
  }

  &>:last-child {
    width: 60%;
  }
`