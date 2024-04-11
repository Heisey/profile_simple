
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Styles from './styles'

type ModalType = typeof B.Lib.Layout.Modal.Component
export type ModalProps = React.ComponentProps<ModalType>

const Modal: React.FC<ModalProps> = (props) => {

  return <Styles.Modal { ...props } />
}

export const Component = Modal