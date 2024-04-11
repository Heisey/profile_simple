
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Core from '../../../../core'

import * as Styles from './styles'

interface Props {
  projects: Core.I.Project[]
  changeCurrentProject: (args: string) => void
}

const Projects: React.FC<Props> = (props) => {

  const projects = props.projects.filter(dataSet => dataSet.name !== 'home')

  return (
    <Styles.Projects>
      <B.Lib.Typography.Title.Component className='title' theme='LIGHT'>Projects</B.Lib.Typography.Title.Component>
      <ul className='list'>
        {projects.map(dataSet => (
          <li className='projectList'>
            <B.Lib.Typography.Text.Component className='projectList__title' theme='LIGHT'>{dataSet.title}</B.Lib.Typography.Text.Component>
            <B.Lib.Typography.Text.Component className='projectList__desc' theme='LIGHT'>{dataSet.desc}</B.Lib.Typography.Text.Component>
            <B.Lib.Buttons.Button.Component className='projectList__button' onClick={() => props.changeCurrentProject(dataSet.name)} variant='TEXT'><B.Lib.Typography.Text.Component>More</B.Lib.Typography.Text.Component></B.Lib.Buttons.Button.Component>
          </li>
        ))}
      </ul>
    </Styles.Projects>
  )
}

export const Component = Projects