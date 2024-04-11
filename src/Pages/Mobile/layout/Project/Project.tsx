
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Core from '../../../../core'
import * as Link from '../../../../components/Link'

import * as Styles from './styles'

interface Props {
  project: Core.I.Project
  changeSlide: (args: string, project?: string) => void
}

const Project: React.FC<Props> = (props) => {

  return (
    <Styles.Project>
      <div className='header'>
        <B.Lib.Buttons.Button.Component onClick={() => props.changeSlide('projects', 'home')} className='back' variant='TEXT'>back</B.Lib.Buttons.Button.Component>
        <B.Lib.Typography.Title.Component className='title' theme='LIGHT'>{props.project.title}</B.Lib.Typography.Title.Component>
      </div>

      <div className='info'>
        {props.project.paragraphs.map(dataSet => (
          <B.Lib.Typography.Text.Component theme='LIGHT'>{dataSet}</B.Lib.Typography.Text.Component>
        ))}
      </div>

      <div className='buttons'>
        {props.project.repo && <Link.Component to={props.project.repo}>Repo</Link.Component>}
        {props.project.site && <Link.Component to={props.project.site}>Site</Link.Component>}
      </div>
    </Styles.Project>
  )
}

export const Component = Project