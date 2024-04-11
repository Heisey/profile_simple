
import * as React from 'react'
import * as B from '@heisey/componentlib'

import resumeImage from '../../assets/resume.jpg'
import resumeFile from '../../assets/resume.pdf'

import * as Image from './components/Image'

import * as Styles from './styles'

interface Props {
  open: boolean
  toggleOpen: () => void
}

export const Resume: React.FC<Props> = (props) => {
  
  return (
    <Styles.Resume open={props.open} onClose={props.toggleOpen}>
      <B.Lib.Typography.Title.Component theme='LIGHT'>Check Out My Resume</B.Lib.Typography.Title.Component>
      <div className='images'>
        <Image.Component file={resumeFile} image={resumeImage} name='Modern' />
        <Image.Component file={resumeFile} image={resumeImage} name='Modern' />
      </div>
    </Styles.Resume>
  )
}

export const Component = Resume