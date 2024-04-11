
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Link from '../../../components/Link'
import * as Core from '../../../core'

import * as List from '../List'

import * as Styles from './styles'

interface Props {
  project: Core.I.Project
  switchContent: (args: string) => void
}

const Main: React.FC<Props> = (props) => {

  const screenSize = B.Hooks.useScreenSize()

  const titleSize = props.project.name === 'home' ? 'big' : 'small'
  const isDesktop = screenSize.width > Core.config.sizes.TABLET
  
  return (
    <Styles.Main titleSize={titleSize} isDesktop={isDesktop}>
      <div className='left'>
        <B.Lib.Typography.Title.Component className='title' theme='LIGHT'>{props.project.title}</B.Lib.Typography.Title.Component>
        <div className='main-text'>
          {props.project.paragraphs.map(dataSet => (
            <B.Lib.Typography.Text.Component theme='LIGHT'>
              {dataSet}
            </B.Lib.Typography.Text.Component>
          ))}
        </div>
        <div className='buttons'>
          {props.project.site && <Link.Component to={props.project.site}>Site</Link.Component>}
          {props.project.repo && <Link.Component to={props.project.repo}>Repo</Link.Component>}
        </div>
      </div>
      {isDesktop && <List.Component { ...props } currentContent={props.project.name} />}
    </Styles.Main>
  )
}

export const Component = Main