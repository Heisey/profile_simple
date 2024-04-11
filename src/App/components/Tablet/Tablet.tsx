
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Projects from '../Projects'
import * as Styles from './styles'

interface Props {
  switchContent: (args: string) => void
  currentContent: string
  toggleEmailModal: () => void
  toggleResumeModal: () => void
}

const Tablet: React.FC<Props> = (props) => {

  const [showMenu, showMenuHandler] = React.useState(false)

  const toggleShowMenu = () => showMenuHandler(!showMenu)

  const toggleResumeModal = () => {
    toggleShowMenu()
    setTimeout(props.toggleResumeModal, 400)
  }

  const toggleEmailModal = () => {
    toggleShowMenu()
    setTimeout(props.toggleEmailModal, 400)
  }

  const switchContent = (args: string) => {
    props.switchContent(args)
    toggleShowMenu()
  }

  return (
    <Styles.Tablet showMenu={showMenu}>
      <B.Lib.Buttons.Button.Component className='icon' variant='TEXT'>
        <B.Assets.FA.Bars onClick={toggleShowMenu} />
      </B.Lib.Buttons.Button.Component>
      <div className='menu'>
        <div className='socialMedia'>
          <B.Lib.Buttons.Button.Component variant='TEXT'>
            <B.Assets.FA.DownloadFile className='download' onClick={toggleResumeModal} />
          </B.Lib.Buttons.Button.Component>

          <B.Lib.Buttons.Button.Component variant='TEXT'>
            <B.Assets.FA.At onClick={toggleEmailModal} />
          </B.Lib.Buttons.Button.Component>

          <B.Lib.Navigation.Link.Component to='https://github.com/Heisey'>
            <B.Assets.FA.Github />
          </B.Lib.Navigation.Link.Component>

          <B.Lib.Navigation.Link.Component to='https://www.npmjs.com/~heisey'>
            <B.Assets.FA.Npm size='50px' />  
          </B.Lib.Navigation.Link.Component>
        </div>
        <B.Assets.FA.Close onClick={toggleShowMenu} className='close' />
        <div className='content'>
          <Projects.Component { ...props } switchContent={switchContent} large />
        </div>
      </div>
    </Styles.Tablet>
  )
}

export const Component = Tablet