
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Button from '../../../../components/Button'

import * as Styles from './styles'

const StageTwo: React.FC = () => {

  return (
    <Styles.StageTwo>
      <B.Lib.Typography.Title.Component theme='LIGHT'>Message Sent</B.Lib.Typography.Title.Component>
      <B.Lib.Typography.Text.Component theme='LIGHT'>I will respone to your message shortly</B.Lib.Typography.Text.Component>

      <Button.Component className='button' variant='OUTLINE'>Close</Button.Component>
    </Styles.StageTwo>
  )
}

export const Component = StageTwo