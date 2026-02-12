
import { useGSAP } from '@gsap/react'
import * as React from 'react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import { useGlobalStore } from "store"
import type { DockApp } from "types"
import { gsap } from 'utils'
import { dockApps, tempDockApps } from 'config'
import { LaunchpadIcon } from './LaunchPad'

export const Dock: React.FC = () => {
    const featureWindows = useGlobalStore(store => store.featureWindows)
    const openWindow = useGlobalStore(store => store.openWindow)
    const closeWindow = useGlobalStore(store => store.closeWindow)
    const openLaucnPadWindow = useGlobalStore(store => store.openLaunchPad)

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
        <DockStyles>
            <DockContainerStyles ref={dockContainerRef}>
                <DockAppStyles>
                    <DockIconStyles
                        type="button"
                        aria-label="Launchpad"
                        data-dock-icon
                        data-tooltip-id="dock-tooltip"
                        data-tooltip-content="Launchpad"
                        data-tooltip-delay-show={500}
                        $canOpen={true}
                        onClick={openLaucnPadWindow}
                    >
                        <LaunchpadIcon
                            items={[
                                { src: "/images/finder2.png" },
                                { src: "/images/safari.png" },
                                { src: "/images/appStore.png" },
                                { src: "/images/contact.png" },
                                { src: "/images/terminal.png" },
                                { src: "/images/pdfReader.png" },
                                { src: "/images/settings.png" },
                                { src: "/images/photos.png" },
                                { src: "/images/finder2.png" },
                            ]}
                        />
                    </DockIconStyles>
                </DockAppStyles>

                {dockApps.map(dataSet => (
                    <DockAppStyles key={dataSet.id}>
                        <DockIconStyles
                            type="button"
                            aria-label={dataSet.name}
                            data-dock-icon
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={dataSet.name}
                            data-tooltip-delay-show={500}
                            disabled={!dataSet.canOpen}
                            $canOpen={dataSet.canOpen}
                            onClick={() => toggleApp(dataSet)}
                        >
                            <img
                                src={dataSet.icon}
                                alt={dataSet.name}
                                loading="lazy"

                            />
                        </DockIconStyles>
                    </DockAppStyles>
                ))}

                {showDivider() && <DockDividerStyles />}

                {featureWindows.pdfReader.isOpen && <TempOpenApp {...tempDockApps.pdfReader as DockApp} toggleApp={toggleApp} />}

                <DockTooltipStyles id="dock-tooltip" place='top' />
            </DockContainerStyles>
        </DockStyles>
    )
}

interface TempOpenAppProps extends DockApp {
    toggleApp: (args: DockApp) => void
}

const TempOpenApp: React.FC<TempOpenAppProps> = (props) => {
    const { id, name, canOpen, icon, toggleApp } = props

    return (
        <DockAppStyles key={id}>
            <DockIconStyles
                type="button"
                aria-label={name}
                data-dock-icon
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={500}
                disabled={!canOpen}
                $canOpen={canOpen}
                onClick={() => toggleApp(props)}
            >
                <img
                    src={icon}
                    alt={name}
                    loading="lazy"

                />
            </DockIconStyles>
        </DockAppStyles>
    )
}


const DockStyles = styled.section({
    position: "absolute",
    bottom: "1.25rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    userSelect: "none",

    "@media (max-width: 640px)": {
        display: "none"
    }
})

const DockContainerStyles = styled.div({
    display: "inline-flex",
    width: "fit-content",

    alignItems: "flex-end",
    justifyContent: "space-between",

    gap: "0.375rem",
    padding: "0.375rem",

    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(12px)",

    borderRadius: "1rem"
})

const DockAppStyles = styled.div({
    position: "relative",
    display: "flex",
    justifyContent: "center"
})

interface DockIconStylesProps {
    $canOpen: boolean
}

const DockIconStyles = styled.button<DockIconStylesProps>((props) => ({
  width: "3.5rem",
  height: "3.5rem",
  cursor: "pointer",
  padding: 0,
  border: 0,
  background: "transparent",
  appearance: "none",
  WebkitAppearance: "none",
  lineHeight: 0,
  display: "grid",
  placeItems: "center",

  // ✅ one knob controls EVERYTHING
  "--dock-safe": "78%",

  "@media (min-width: 1920px)": {
    width: "5rem",
    height: "5rem",
  },

  // ✅ size any non-img child (LaunchpadIcon is a div)
  "& > *": {
    width: "var(--dock-safe)",
    height: "var(--dock-safe)",
  },

  // ✅ size the pngs the same as launchpad
  "& img, & svg": {
    width: "var(--dock-safe)",
    height: "var(--dock-safe)",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
    opacity: props.$canOpen ? 1 : 0.6,
    pointerEvents: "none",
  },

  "&:disabled": {
    cursor: "default",
    opacity: 0.5,
  },
}))



const DockTooltipStyles = styled(Tooltip)({
    // "&&": {
    //     background: "#bfdbfe",
    //     color: "#1e3a8a",
    // },

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
    alignSelf: "stretch",           // fills dock height
    marginInline: "0.35rem",        // spacing around divider
    borderRadius: "999px",

    // subtle macOS-ish separator: light + dark line effect
    background:
        "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(0,0,0,0.20))",

    // optional: slightly fade top/bottom like macOS
    opacity: 0.55,
})