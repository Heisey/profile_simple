
import { WindowWrapper } from 'components/hoc/WindowWrapper'
import * as React from 'react'

const Resume: React.FC = () => {

    return (
        <div>
            resume
        </div>
    )
}

export const ResumeWindow = WindowWrapper(Resume, "resume")