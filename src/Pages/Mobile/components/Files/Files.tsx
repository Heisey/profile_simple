
import * as React from 'react'
import * as B from '@heisey/componentlib'

import resumeImage from '../../../../assets/resume.jpg'
import resumeFile from '../../../../assets/resume.pdf'

import * as Styles from './styles'

interface FilesArgs {
  src: string
  text: string
  href: string
}

interface Props {
  closeFiles: () => void
}

const Files: React.FC<Props> = (props) => {

  const renderFile = (args: FilesArgs) => (
    <div className='file'>
      <a href={args.href} target='blank' onClick={() => console.log('puppies')}>
        <B.Lib.Images.Image.Component className='file__image' src={args.src} />
        <B.Lib.Typography.Text.Component className='file__text'>{args.text}</B.Lib.Typography.Text.Component>
      </a>
    </div>
  )

  return (
    <Styles.Files>
      <div className='content'>
        {renderFile({ src: resumeImage, href: resumeFile, text: 'Modern'})}
        {renderFile({ src: resumeImage, href: resumeFile, text: 'Modern'})}
      </div>
      <B.Lib.Buttons.Button.Component onClick={props.closeFiles} className='back' variant='OUTLINE' buttontheme='PRIMARY'>Cancel</B.Lib.Buttons.Button.Component>
    </Styles.Files>
  )
}

export const Component = Files