
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Styles from './styles'

interface Props {
  file: string
  image: string
  name: string
}

const Image: React.FC<Props> = (props) => {

  return (
    <Styles.Image>
      <B.Lib.Typography.Text.Component className='text' theme='LIGHT'>{props.name}</B.Lib.Typography.Text.Component>
      <a href={props.file} target='blank'>
        <B.Lib.Images.Image.Component className='image' src={props.image} />
      </a>
    </Styles.Image>
  )
}


export const Component = Image