
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Styles from './styles'

type ButtonType = typeof B.Lib.Buttons.Button.Component
type Props = React.ComponentProps<ButtonType>

const Button: React.FC<Props> = (props) => {

    return <Styles.Button { ...props } />
}

export const Component = Button