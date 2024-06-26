
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as App_Content from '../../content'

import * as Styles from './styles'

interface Props {
  switchContent: (args: string) => void
  currentContent: string
  className?: string
  large: boolean
}

const Projects: React.FC<Props> = (props) => {

  const curatedList = () => {
    if (props.large) return App_Content.projects.filter(dataSet => dataSet.name !== 'home')

    return App_Content.projects.map(dataSet => {
      if (dataSet.name === 'home') dataSet.title = 'Home'
      return dataSet
    })
  }

  const list = curatedList()

  return (
    <Styles.Projects className={props.className}>
        {list.map(dataSet => (
          <Styles.Item active={dataSet.name === props.currentContent} large={props.large!}>
            <B.Lib.Buttons.Button.Component 
              variant='TEXT' 
              onClick={() => props.switchContent(dataSet.name)}
            >
              {dataSet.title}
            </B.Lib.Buttons.Button.Component>
          </Styles.Item>
        ))}
      </Styles.Projects>
  )
}

Projects.defaultProps = {
  
}

export const Component = Projects