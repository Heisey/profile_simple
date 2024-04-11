
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Styles from './styles'

interface Props {
  changeSlide: (slide: string, project?: string) => void
  name: string
  onChangeName: (args: string) => void
  email: string
  onChangeEmail: (args: string) => void
  message: string
  onChangeMessage: (args: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  closeEmail: () => void
  emailTouched: boolean
  emailValid: boolean
}

const Form: React.FC<Props> = (props) => {

  const nameInput = () => (
    <B.Lib.Inputs.Text.Component 
      value={props.name}
      onChange={e => props.onChangeName(e.currentTarget.value)}
      placeholder='Enter Name'
      id='sender_name'
    />
  )

  const emailInput = () => (
    <B.Lib.Inputs.Text.Component
      value={props.email}
      onChange={e => props.onChangeEmail(e.currentTarget.value)}
      placeholder='Enter Email'
      id='sender_email'
    />
  )

  const messageInput = () => (
    <B.Lib.Inputs.Block.Component
      value={props.message}
      onChange={e => props.onChangeMessage(e.currentTarget.value)}
      placeholder='Enter Message'
      id='sender_message'
    />
  )

  const isDisabled = () => {
    if (props.name.length === 0) return true
    if (props.email.length === 0 || !props.emailTouched || !props.emailValid) return true
    if (props.message.length === 0) return true
    return false
  }

  const buttonDisabled = isDisabled()

  return (
    <Styles.Form id='email' onSubmit={props.onSubmit}>
      <div className='inputs'>
        <B.Lib.Inputs.Label.Component
          input={nameInput()}
          htmlFor='sender_name'
          required
          field='Name'
        />
        <B.Lib.Inputs.Label.Component
          input={emailInput()}
          htmlFor='sender_email'
          required
          field='Email'
        />
        <B.Lib.Inputs.Label.Component
          input={messageInput()}
          htmlFor='sender_message'
          required
          field='Message'
        />
      </div>
      <div className='buttons'>
        <B.Lib.Buttons.Button.Component onClick={props.closeEmail} buttontheme='PRIMARY' variant='OUTLINE'>cancel</B.Lib.Buttons.Button.Component>
        <B.Lib.Buttons.Button.Component disabled={buttonDisabled} type='submit' form='email' buttontheme={buttonDisabled ? 'INFO' : 'PRIMARY'} variant='OUTLINE'>Send</B.Lib.Buttons.Button.Component>
      </div>
    </Styles.Form>
  )
}

export const Component = Form