
import * as React from 'react'

import * as I from './props'
import * as Styles from './styles'

const Link: React.FC<I.Link> = (props) => {

  return (
    <Styles.Link href={props.to}>
      {props.children}
    </Styles.Link>
  )
}

export const Component = Link