
import * as React from 'react'
import styled from 'styled-components'
import { FileText } from "lucide-react"

import { resumes } from "config"

interface SidebarProps {
    activeResumeId: string
    activeResumeIdHandler: (args: string) => void
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const { activeResumeId, activeResumeIdHandler } = props

    return (
        <SidebarStyles>
            <div className='header'>
                <FileText size={16} />
                <span>Resumes</span>
            </div>

            <ul className='list'>
                {resumes.map((r) => {
                    const selected = r.id === activeResumeId
                    return (
                        <ListItem
                            key={r.id}
                            $selected={selected}
                            onClick={() => activeResumeIdHandler(r.id)}
                            title={r.title}
                        >
                            {r.title}
                        </ListItem>
                    )
                })}
            </ul>
        </SidebarStyles>
    )
}

const SidebarStyles = styled.aside({
    borderRight: "1px solid #e5e7eb",
    background: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",

    "& .header": {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 0.75rem",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "0.875rem",
        fontWeight: 700,
        color: "#374151",
    },

    "& .list": {
        padding: "0.5rem",
        overflow: "auto",
    }
})

const ListItem = styled.button<{ $selected?: boolean }>(({ $selected }) => ({
    width: "100%",
    textAlign: "left",
    border: "1px solid transparent",
    borderRadius: "0.5rem",
    padding: "0.6rem 0.65rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    background: $selected ? "#e5e7eb" : "transparent",
    color: "#111827",
    transition: "background 120ms ease",

    ":hover": { background: $selected ? "#e5e7eb" : "#f3f4f6" },
}))
