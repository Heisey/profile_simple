
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Core from '../../../core'

import * as Desktop from '../../components/Desktop'
import * as Tablet from '../../components/Tablet'

import * as Styles from './styles'

interface Props {
  toggleResumeModal: () => void
  toggleEmailModal: () => void
  switchContent: (args: string) => void
  currentContent: string
}

const Header: React.FC<Props> = (props) => {

  const screenSize = B.Hooks.useScreenSize()

  return (
    <Styles.Header>
      <B.Lib.Typography.Text.Component onClick={() => props.switchContent('home')} className='icon'>H</B.Lib.Typography.Text.Component>
      {screenSize.width > Core.config.sizes.TABLET && <Desktop.Component { ...props } />}
      {screenSize.width <= Core.config.sizes.TABLET && <Tablet.Component { ...props } />}
    </Styles.Header>
  )
}

export const Component = Header