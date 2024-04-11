
import * as React from 'react'
import * as B from '@heisey/componentlib'
import * as emailJs from 'emailjs-com'

import * as Core from '../../core'

import * as Contact from './layout/Contact'
import * as Home from './layout/Home'
import * as Projects from './layout/Projects'
import * as Project from './layout/Project'

import * as Styles from './styles'

interface Props {
  projects: Core.I.Project[]
  currentContent: string
  updateCurrentProject: (args: string) => void
}

const Mobile: React.FC<Props> = (props) => {

  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY

  const [overlayShown, overlayShownHandler] = React.useState(false)
  const [localStorage, setLocalStorage] = B.Hooks.useLocalStorage('lastSlide', 'home')
  const [currentSlide, currentSlideHandler] = React.useState(localStorage)
  // const [currentProject, currentProjectHandler] = React.useState<undefined | string>(undefined)
  const [name, nameHandler] = React.useState('')
  const [email, emailHandler] = React.useState('')
  const [emailValid, emailValidHandler] = React.useState(false)
  const [emailTouched, emailTouchedHandler] = React.useState(false)
  const [message, messageHandler] = React.useState('')
  const project = props.projects.filter(dataSet => dataSet.name === props.currentContent)[0]
  const [emailStage, emailStageHandler] = React.useState<Core.I.EmailStage>(Core.keys.emailStage.FORM)

  const changeSlide = (slide: string, project?: string) => {
    overlayShownHandler(true)
    setTimeout(() => {
      if (project) props.updateCurrentProject(project)
      currentSlideHandler(slide)
    setLocalStorage(slide)
    }, 300)
    setTimeout(() => {
      overlayShownHandler(false)
    }, 600)
  }

  const changeProject = (args: string) => {
    props.updateCurrentProject(args)
    changeSlide('project')
  }

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const values = { 
      sender_name: name, 
      sender_email: email,
      sender_message: message
    }
    const res = await emailJs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
    
    if (res.status !== 200) return  emailStageHandler(Core.keys.emailStage.ERROR)
    
    emailStageHandler(Core.keys.emailStage.SUCCESS)
  }

  const handleEmail = (args: string) => {
    if (!emailTouched && args.length > 0) emailTouchedHandler(true)
    else if (emailTouched && args.length === 0) emailTouchedHandler(false)
    const isValid = B.Utils.validation.isEmail(args)
    if (emailValid && !isValid) emailValidHandler(false)
    else if (!emailValid && isValid) emailValidHandler(true)
    emailHandler(args)
  }

  return (
    <Styles.Mobile overlayShown={overlayShown}>
      <div className='main'>
        <B.Lib.Buttons.Button.Component className='icon' variant='TEXT'><B.Lib.Typography.Text.Component>H</B.Lib.Typography.Text.Component></B.Lib.Buttons.Button.Component>
        {currentSlide === 'home' && <Home.Component project={project} />}
        {currentSlide === 'projects' && <Projects.Component projects={props.projects} changeCurrentProject={changeProject} />}
        {currentSlide === 'project' && <Project.Component project={project} changeSlide={changeSlide} />}
        {currentSlide === 'contact' && <Contact.Component updateEmailStage={emailStageHandler} emailValid={emailValid} emailTouched={emailTouched} emailStage={emailStage} onSubmit={onSumbit} changeSlide={changeSlide} name={name} email={email} message={message} onChangeEmail={handleEmail} onChangeMessage={messageHandler} onChangeName={nameHandler} />}
      </div>
      <nav className='nav'>
        <B.Lib.Buttons.Button.Component onClick={() => changeSlide('home', 'home')} variant='TEXT'><B.Assets.FA.Archway size='25px' /></B.Lib.Buttons.Button.Component>
        <B.Lib.Buttons.Button.Component onClick={() => changeSlide('projects', 'home')} variant='TEXT'><B.Assets.FA.PuzzlePiece size='25px' /></B.Lib.Buttons.Button.Component>
        <B.Lib.Buttons.Button.Component onClick={() => changeSlide('contact', 'home')} variant='TEXT'><B.Assets.FA.MobileRetro size='15px' /></B.Lib.Buttons.Button.Component>
      </nav>
    </Styles.Mobile>
  )
}

export const Component = Mobile