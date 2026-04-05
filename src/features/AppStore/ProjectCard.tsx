
import * as React from 'react'
import styled from 'styled-components'
import type { Project } from 'types'

import { DifficultyDots } from "./DifficultyDots"

interface ProjectCardProps extends Project {
    openDetail: (args: string) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = (props) => {
    const { openDetail, icon, cover, id, name, subtitle, difficulty } = props

    return (
        <ProjectCardStyles onClick={() => openDetail(id)}>
            <div className='top'>
                <img className="top__icon" src={icon} alt="" />
                <div>
                    <h5 className='top__icon--name'>{name}</h5>
                    <span className='sub'>{subtitle}</span>
                </div>
                <DifficultyDots value={difficulty} />
            </div>

            <div className='picture'>
                <img className='picture__image' src={cover} alt="" loading="lazy" />
                <div className='picture__gloss' aria-hidden="true" />
            </div>
        </ProjectCardStyles>
    )
}

const ProjectCardStyles = styled.div({
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    borderRadius: "1.25rem",
    padding: "0.9rem",
    textAlign: "left",
    cursor: "default",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
    transition: "transform 140ms ease, box-shadow 140ms ease",

    "& .top": {
        display: "grid",
        gridTemplateColumns: "3.1rem 1fr auto",
        gap: "0.7rem",
        alignItems: "center",

        "&__icon": {
            width: "3.1rem",
            height: "3.1rem",
            borderRadius: "0.95rem",
            border: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(0,0,0,0.04)",
            objectFit: "cover",

            "&--name": {
                fontWeight: 950,
                color: "#111827",
                fontSize: "1rem",
                lineHeight: 1.1,
            },

            "&--sub": {
                marginTop: "0.2rem",
                color: "#6b7280",
                fontSize: "0.88rem",
                lineHeight: 1.2,
            }
        },
    },

    "& .picture": {
        marginTop: "0.85rem",
        borderRadius: "1rem",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(0,0,0,0.03)",
        position: "relative",

        "&__image": {
            width: "100%",
            height: "11rem",
            objectFit: "cover",
            display: "block",
        },

        "&__gloss": {
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0))",
            pointerEvents: "none",
        }
    }
})