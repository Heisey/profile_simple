
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Email from '../Pages/Email'
import * as Resume from '../Pages/Resume'
import * as Mobile from '../Pages/Mobile'
import * as Core from '../core'

import * as App_Content from './content'
import * as Header from './layout/Header'
import * as Main from './layout/Main'

import * as styles from './styles'

const App: React.FC = () => {

  const screenSize = B.Hooks.useScreenSize()

  const [localStorage, setLocalStorage] = B.Hooks.useLocalStorage('lastpage', 'home')
  const [contentShown, contentShownHandler] = React.useState(localStorage)
  const [modalResumeOpen, modalResumeOpenHandler] = React.useState(false)
  const [modalEmailOpen, modalEmailOpenHandler] = React.useState(false)

  const isDesktop = screenSize.width > Core.config.sizes.TABLET
  const isMobile = screenSize.width <= Core.config.sizes.MOBILE

  const toggleModalResumeOpen = () => modalResumeOpenHandler(!modalResumeOpen)
  const toggleModalEmailOpen = () => modalEmailOpenHandler(!modalEmailOpen)

  const content: Core.I.Project = App_Content.projects.filter(dataSet => dataSet.name === contentShown)[0]

  const handleContentShown = (args: string) => {
    contentShownHandler(args)
    setLocalStorage(args)
  }

  const renderDesktop = () => (
    <styles.App isDesktop={isDesktop}>
      <div className='card'>
        <Header.Component toggleEmailModal={toggleModalEmailOpen} toggleResumeModal={toggleModalResumeOpen} switchContent={handleContentShown} currentContent={content.name} />
        <Main.Component project={content} switchContent={handleContentShown} />
      </div>

      {/* Modals */}
      <Email.Component open={modalEmailOpen} toggleOpen={toggleModalEmailOpen} />
      <Resume.Component open={modalResumeOpen} toggleOpen={toggleModalResumeOpen} />
    </styles.App>
  )

  return (
    <>
      {!isMobile && renderDesktop()}
      {isMobile && <Mobile.Component projects={App_Content.projects} currentContent={content.name} updateCurrentProject={handleContentShown} />}
    </>
  )
}

export const Component = App