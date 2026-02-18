
import { DockIcon, DockTable } from 'components/base/Dock'
import { iosDockApps } from 'config'
import * as React from 'react'

export const Dock: React.FC = () => {
    return (
        <DockTable>
            {iosDockApps.map(dataSet => <DockIcon {...dataSet} />)}
        </DockTable>
    )
}