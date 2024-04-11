
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Core from '../../../../core'

import * as Styles from './styles'

interface Props {
  project: Core.I.Project
}

const Home: React.FC<Props> = (props) => {

  return (
    <Styles.Home>
      <B.Lib.Typography.Title.Component className='title' theme='LIGHT'>{props.project.title}</B.Lib.Typography.Title.Component>
      <div className='info'>
        {props.project.paragraphs.map(dataSet => <B.Lib.Typography.Text.Component theme='LIGHT'>{dataSet}</B.Lib.Typography.Text.Component>)}
      </div>
      <div className='body__buttons'>
        {props.project.repo && <B.Lib.Navigation.Link.Component to={props.project.repo}>Repo</B.Lib.Navigation.Link.Component>}
        {props.project.site && <B.Lib.Navigation.Link.Component to={props.project.site}>Site</B.Lib.Navigation.Link.Component>}
      </div>
    </Styles.Home>
  )
}

export const Component = Home