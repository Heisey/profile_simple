
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Core from '../../../../core'

import * as Files from '../../components/Files'
import * as Form from '../../components/Form'

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
  emailStage: Core.I.EmailStage
  emailTouched: boolean
  emailValid: boolean
  updateEmailStage: (args: Core.I.EmailStage) => void
}

const Contact: React.FC<Props> = (props) => {

  const [showEmail, showEmailHandler] = React.useState(false)
  const [showFiles, showFilesHandler] = React.useState(false)


  const toggleShowEmail = () => showEmailHandler(!showEmail)
  const toggleShowFiles = () => showFilesHandler(!showFiles)

  const renderMain = () => (
    <div className='main'>
      <B.Lib.Buttons.Button.Component onClick={toggleShowEmail} buttontheme='PRIMARY' variant='OUTLINE'>Email Me</B.Lib.Buttons.Button.Component>

      <B.Lib.Buttons.Button.Component onClick={toggleShowFiles} buttontheme='PRIMARY' variant='OUTLINE'>My Resume</B.Lib.Buttons.Button.Component>
    </div>
  )

  const renderSuccess = () => (
    <div className='success'>
      <B.Assets.FA.ThumbsUp size='100px' className='visual' />
      <B.Lib.Typography.Text.Component className='message'>Message Sent</B.Lib.Typography.Text.Component>
    </div>
  )

  const renderError = () => (
    <div className='error'>
      <B.Assets.FA.FaceFrown size='150px' className='visual' />
      <B.Lib.Typography.Text.Component className='message'>Something went wrong</B.Lib.Typography.Text.Component>

      <B.Lib.Buttons.Button.Component onClick={() => props.updateEmailStage(Core.keys.emailStage.FORM)} buttontheme='PRIMARY' variant='OUTLINE'>Retry</B.Lib.Buttons.Button.Component>
    </div>
  )

  const renderEmail = () => (
    <div className='email'>
      {props.emailStage === Core.keys.emailStage.FORM && <Form.Component { ...props } closeEmail={toggleShowEmail} />}
      {props.emailStage === Core.keys.emailStage.SUCCESS && renderSuccess()}
      {props.emailStage === Core.keys.emailStage.ERROR && renderError()}
    </div>
  )

  return (
    <Styles.Contact>
      {(!showEmail && !showFiles) && renderMain()}
      {showEmail && renderEmail()}
      {showFiles && <Files.Component closeFiles={toggleShowFiles} />}
    </Styles.Contact>
  )
}

export const Component = Contact