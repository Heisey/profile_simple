
import { useGSAP } from '@gsap/react'
import * as React from 'react'
import styled from 'styled-components'
import { gsap } from 'utils'
import { fontWeight } from 'config'

export const Hero: React.FC = () => {
    const titleRef = React.useRef<HTMLHeadingElement | null>(null)
    const subTitleRef = React.useRef<HTMLParagraphElement | null>(null)

    useGSAP(() => {
        const subTitleCleanup = textHover({ container: subTitleRef.current, type: "subTitle" })
        const titleCleanup = textHover({ container: titleRef.current, type: "title" })

        return () => {
            subTitleCleanup()
            titleCleanup()
        }
    }, [])

    return (
        <HeroStyles>
            <p ref={subTitleRef}>{renderText({
                text: "Welcome to my", 
                styles: {
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                    fontFamily: "Georama"
                },
                baseWeight: 100
            })}</p>
            <h1 ref={titleRef}>{renderText({
                text: "Portfolio",
                styles: {
                    fontSize: "8rem",
                    lineHeight: "1",
                    fontStyle: "italic",
                    fontFamily: "Georama"
                }
            })}</h1>

            <SmallScrennStyles>
                <p>Designed for Desktop/Tablet Devices only</p>
            </SmallScrennStyles>
        </HeroStyles>
    )
}

interface RenderTextArgs {
    text: string,
    styles?: React.CSSProperties
    baseWeight?: number
}

const renderText = (args: RenderTextArgs) => [...args.text].map((char, index) => (
    <AnimatedCharStyles key={index} style={args.styles} $baseWeight={args.baseWeight || 400}>{char === "" ? "\u00A0" : char}</AnimatedCharStyles>
))

interface TextHoverArgs {
    container?: HTMLElement | null
    type: keyof typeof fontWeight
}

const textHover = (args: TextHoverArgs): (() => void) => {
    const { container, type } = args

    if (!container) return () => {}

    const letters = container.querySelectorAll("span")
    const weights = fontWeight[type]

    const mouseEnter = (e: MouseEvent) => {
        const containerBounds = container.getBoundingClientRect()
        const mouseX = e.clientX - containerBounds.left

        letters.forEach(char => {
            const letterBounds = char.getBoundingClientRect()
            const distance = Math.abs(mouseX - (letterBounds.left - containerBounds.left + letterBounds.width / 2))
            const intensity = Math.exp(-(distance ** 2) / 2000)

            const weight = weights.min + (weights.max - weights.min) * intensity
            animateLetter({
                letter: char,
                weight
            })
        })
    }

    const mouseLeave = () => {
        letters.forEach(char => {
            animateLetter({
                letter: char,
                weight: weights.default,
                duration: 0.3
            })
        })
    }

    container.addEventListener("mousemove", mouseEnter)
    container.addEventListener("mouseleave", mouseLeave)

    return () => {
        container.removeEventListener("mousemove", mouseEnter)
        container.removeEventListener("mouseleave", mouseLeave)
    }
 }

interface AnimateLetterArgs {
    letter: HTMLSpanElement
    weight: number
    duration?: number
}

const animateLetter = (args: AnimateLetterArgs) => gsap.to(args.letter, { 
    duration: args.duration || 0.25, 
    ease: 'power2.out',
    fontVariationSettings: `"wght" ${args.weight}`,
})

const HeroStyles = styled.section({
    color: "#e5e7eb", // text-gray-200

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    userSelect: "none",

    "& > h1": {
        marginTop: "1.75rem"
    },

    "@media (max-width: 640px)": {
        height: "100vh",
        width: "100%",
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem"
    }
})

const SmallScrennStyles = styled.div({
    margin: "1.75rem", 
    backgroundColor: "rgba(252, 165, 165, 0.2)", 
    backdropFilter: "blur(16px)", 
    padding: "0.75rem", 
    borderRadius: "0.375rem", 

    position: "absolute",
    top: "2.5rem", 

    "@media (min-width: 640px)": {
        display: "none" 
    },

    "& p": {
        flex: 1,
        fontSize: "16px",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif", 
        color: "#9CA3AF" 
    }
})

interface AnimatedCharStyles {
    $baseWeight: number
}

const AnimatedCharStyles = styled.span<AnimatedCharStyles>((props) => ({
  fontVariationSettings: `"wght" ${props.$baseWeight}`,
}))