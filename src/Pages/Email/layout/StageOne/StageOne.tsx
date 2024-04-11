
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Button from '../../../../components/Button'
import * as Label from '../../../../components/Label'

import * as Styles from './styles'

interface Props {
  onSubmit: (args: React.FormEvent<HTMLFormElement>) => void
  name: string
  onChangeName: (args: string) => void
  email: string
  onChangeEmail: (args: string) => void
  message: string
  onChangeMessage: (args: string) => void
  isButtonDisabled: boolean
}

const StageOne: React.FC<Props> = (props) => {

  return (
    <Styles.StageOne>
      <B.Lib.Typography.Title.Component className='title' theme='LIGHT'>Send Me a Message</B.Lib.Typography.Title.Component>
      <form id='email' className='form' onSubmit={props.onSubmit}>
        <Label.Component
          input={<B.Lib.Inputs.Text.Component id='sender_name' placeholder='Enter Name' value={props.name} onChange={(e) => props.onChangeName(e.currentTarget.value)} />}
          field='Name'
          required
          htmlFor='sender_name'
        />
        <Label.Component
          input={<B.Lib.Inputs.Text.Component id='sender_email' placeholder='Enter Email' value={props.email} onChange={(e) => props.onChangeEmail(e.currentTarget.value)} />}
          field='Email'
          required
          htmlFor='sender_email'
        />
        <Label.Component
          input={<B.Lib.Inputs.Block.Component id='sender_message' placeholder='Enter Message' value={props.message} onChange={(e) => props.onChangeMessage(e.currentTarget.value)} />}
          field='Message'
          required
          htmlFor='sender_message'
        />
        <Button.Component
          className='submit' 
          variant='OUTLINE' 
          disabled={props.isButtonDisabled} 
          type='submit'
          form='email'
        >
          submit
        </Button.Component>
      </form>
    </Styles.StageOne>
  )
}

export const Component = StageOne