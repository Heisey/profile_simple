
import * as React from 'react'
import * as B from '@heisey/componentlib'
import * as emailJs from 'emailjs-com'

import * as Modal from '../../components/Modal'

import * as StageOne from './layout/StageOne'
import * as StageTwo from './layout/StageTwo'

interface Props {
  open: boolean
  toggleOpen: () => void
}

const Email: React.FC<Props> = (props) => {

  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY

  const [name, nameHandler] = React.useState('')
  const [email, emailHandler] = React.useState('')
  const [emailValid, emailValidHandler] = React.useState(false)
  const [emailTouched, emailTouchedHandler] = React.useState(false)
  const [message, messageHandler] = React.useState('')
  const [stage, stageHandler] = React.useState(1)

  const handleEmail = (args: string) => {
    if (!emailTouched && args.length > 0) emailTouchedHandler(true)
    else if (emailTouched && args.length === 0) emailTouchedHandler(false)
    const isValid = B.Utils.validation.isEmail(args)
    if (emailValid && !isValid) emailValidHandler(false)
    else if (!emailValid && isValid) emailValidHandler(true)
    emailHandler(args)
  }

  const isDisabled = () => {
    if (name.length === 0) return true
    if (email.length === 0 || !emailTouched || !emailValid) return true
    if (message.length === 0) return true
    return false
  }

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const values = { 
      sender_name: name, 
      sender_email: email,
      sender_message: message
    }
    const res = await emailJs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
    
    if (res.status !== 200) return
    stageHandler(2)
    
  }

  return (
    <Modal.Component open={props.open} onClose={props.toggleOpen}>
      {stage === 1 && (
        <StageOne.Component 
          name={name}
          onChangeName={nameHandler}
          email={email}
          onChangeEmail={handleEmail}
          message={message}
          onChangeMessage={messageHandler}
          onSubmit={onSumbit}
          isButtonDisabled={isDisabled()}
        />
      )}
      {stage === 2 && <StageTwo.Component />}
    </Modal.Component>
  )
}

export const Component = Email