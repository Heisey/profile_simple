
import { useGSAP } from '@gsap/react'
import * as React from 'react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import { useGlobalStore } from "store"
import type { DockApp } from "types"
import { gsap } from 'utils'
import { macOsDockApps, tempDockApps } from 'config'
import { DockIcon, DockTable } from 'components/base/Dock'

export const Dock: React.FC = () => {
    const featureWindows = useGlobalStore(store => store.featureWindows)
    const openWindow = useGlobalStore(store => store.openWindow)
    const closeWindow = useGlobalStore(store => store.closeWindow)

    const dockContainerRef = React.useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        const container = dockContainerRef.current

        if (!container) return

        const icons = container.querySelectorAll("[data-dock-icon]")
        const containerBounds = container.getBoundingClientRect()

        const animateIcons = (e: MouseEvent) => {

            const mouseX = e.clientX - containerBounds.left

            icons.forEach(icon => {
                const iconBounds = icon.getBoundingClientRect()
                const center = iconBounds.left - containerBounds.left + iconBounds.width / 2
                const distance = Math.abs(mouseX - center)
                const intensity = Math.exp(-(distance ** 3.5) / 20000)

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out"
                })
            })
        }

        const resetIcons = () => icons.forEach(icon => gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out"
        }))

        container.addEventListener("mousemove", animateIcons)
        container.addEventListener("mouseleave", resetIcons)

        return () => {
            container.removeEventListener("mousemove", animateIcons)
            container.removeEventListener("mouseleave", resetIcons)
        }
    }, [])

    const toggleApp = (app: DockApp) => {
        if (!app.canOpen) return

        const selectedWindow = featureWindows[app.id]

        if (selectedWindow.isOpen) closeWindow(app.id)
        else openWindow(app.id, {})
    }

    const showDivider = () => {
        if (featureWindows.pdfReader.isOpen) return true
        return false
    }

    return (
        <DockTable tableRef={dockContainerRef}>

            {macOsDockApps.map(dataSet => (
                <DockAppStyles key={dataSet.id}>
                    <DockIcon {...dataSet} />
                </DockAppStyles>
            ))}

            {showDivider() && <DockDividerStyles />}

            {featureWindows.pdfReader.isOpen && <TempOpenApp {...tempDockApps.pdfReader as DockApp} toggleApp={toggleApp} />}

            <DockTooltipStyles id="dock-tooltip" place='top' />
        </DockTable>
    )
}

interface TempOpenAppProps extends DockApp {
    toggleApp: (args: DockApp) => void
}

const TempOpenApp: React.FC<TempOpenAppProps> = (props) => {

    return (
        <DockAppStyles key={props.id}>
            <DockIcon { ...props } />
        </DockAppStyles>
    )
}




const DockAppStyles = styled.div({
    position: "relative",
    display: "flex",
    justifyContent: "center"
})


const DockTooltipStyles = styled(Tooltip)({
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    width: "fit-content",
    textAlign: "center",
    fontSize: "0.75rem",
    borderRadius: "0.375rem",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
})

const DockDividerStyles = styled.div({
    width: "1px",
    alignSelf: "stretch",
    marginInline: "0.35rem",
    borderRadius: "999px",
    background:
        "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(0,0,0,0.20))",
    opacity: 0.55,
})