
import * as React from 'react'
import styled from 'styled-components'

import { PROJECTS } from "config"
import { ProjectCard } from './ProjectCard'

interface MainContentProps {
    openDetail: (id: string) => void
}

export const MainContent: React.FC<MainContentProps> = (props) => {
    const { openDetail } = props

    return (
        <MainContentStyles>
            <div className='header'>
                <h3 className='title'>Explore</h3>
                <span className='hint'>{PROJECTS.length} projects</span>
            </div>

            <div className='content'>
                {/* <div className='hero'>
                    <div className='hero__text'>
                        <span className='hero__text--kicker'>Featured</span>
                        <span className='hero__text--title'>Project Showcase</span>
                        <span className='hero__text--sub'>App Store style browsing. Click a card to open the app page.</span>
                    </div>
                </div> */}

                <div className='grid'>
                    {PROJECTS.map((p) => <ProjectCard key={p.id} {...p} openDetail={openDetail} />)}
                </div>
            </div>
        </MainContentStyles>
    )
}

const MainContentStyles = styled.div({
    "& .header": {
        padding: "0.85rem 1rem",
        borderBottom: "1px solid rgba(0,0,0,0.08)",

        "& .title": {
            fontSize: "1.15rem",
            fontWeight: 900,
            color: "#111827",
        },

        "& .hint": {
            fontSize: "0.85rem",
            color: "#6b7280",
        }
    },

    "& .content": {
        flex: 1,
        overflow: "auto",
        padding: "1rem",
    },

    "& .hero": {
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "1.2rem",
        border: "1px solid rgba(0,0,0,0.08)",
        background:
            "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(0,0,0,0.02))",
        boxShadow: "0 18px 35px rgba(0,0,0,0.08)",
        marginBottom: "1rem",

        "&__text": {
            display: "grid",
            alignContent: "start",
            gap: "0.3rem",

            "&--kicker": {
                fontSize: "0.78rem",
                fontWeight: 900,
                color: "#2563eb",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
            },

            "&--title": {
                fontSize: "1.6rem",
                fontWeight: 950,
                color: "#111827",
            },

            "&--sub": {
                fontSize: "0.95rem",
                color: "#374151",
                lineHeight: 1.35,
            }
        },
    },

    "& .grid": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
        gap: "1rem",
    }
})