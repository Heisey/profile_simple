
import * as React from 'react'
import * as B from '@heisey/componentlib'

import * as Styles from './styles'

interface Props {
  toggleEmailModal: () => void
  toggleResumeModal: () => void
}

const Desktop: React.FC<Props> = (props) => {

  return (
    <Styles.Desktop>
      <B.Assets.FA.DownloadFile className='download' onClick={props.toggleResumeModal} />
      <B.Assets.FA.At onClick={props.toggleEmailModal} />
      <B.Lib.Navigation.Link.Component to='https://github.com/Heisey'>
        <B.Assets.FA.Github />
      </B.Lib.Navigation.Link.Component>
      <B.Lib.Navigation.Link.Component to='https://www.npmjs.com/~heisey'>
        <B.Assets.FA.Npm size='50px' />  
      </B.Lib.Navigation.Link.Component>
    </Styles.Desktop>
  )
}

export const Component = Desktop