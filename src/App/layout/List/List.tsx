
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Projects from '../../components/Projects'

import * as Styles from './styles'

interface Props {
  switchContent: (args: string) => void
  currentContent: string
}

const List: React.FC<Props> = (props) => {

  
  return (
    <Styles.List>
      <B.Lib.Typography.Title.Component className='sub-title' theme='LIGHT' as='h3'>Projects</B.Lib.Typography.Title.Component>
      <Projects.Component { ...props } />
    </Styles.List>
  )
}

export const Component = List