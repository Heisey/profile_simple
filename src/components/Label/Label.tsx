
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Styles from './styles'

type LabelType = typeof B.Lib.Inputs.Label.Component
type Props = React.ComponentProps<LabelType>

const Label: React.FC<Props> = (props) => {

  return (
    <Styles.Label 
      { ...props }
    />
  )
}

export const Component = Label