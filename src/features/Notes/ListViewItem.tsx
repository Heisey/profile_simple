
import type { TechStackGroup } from 'config'
import * as React from 'react'
import styled from 'styled-components'
import { formatDate } from 'utils/date'
import type { ViewState } from './state'

interface ListViewItemProps {
    techStackGroup: TechStackGroup
    setView: (args: ViewState) => void
}

export const ListViewItem: React.FC<ListViewItemProps> = (props) => {
    const { techStackGroup, setView } = props

    const date = React.useMemo(() => formatDate(techStackGroup.lastUpdated), [techStackGroup.lastUpdated])

    const openNote = (args: TechStackGroup) => setView({ view: "detail", id: args.id })

    return (
        <ListViewItemStyles key={techStackGroup.category} type="button" onClick={() => openNote(techStackGroup)}>
            <div className='top'>
                <h3 className='top__title'>{techStackGroup.category}</h3>
                <span className='top__date'>{date}</span>
            </div>

            <div className='preview'>{makePreview(techStackGroup.items)}</div>

            <div className='footer'>
                <div className='footer__badge' aria-hidden />
                <span className='footer__text'>
                    {techStackGroup.items.length} skills
                </span>
            </div>
        </ListViewItemStyles>
    )
}

const makePreview = (items: string[]) => {
    // two-line-ish preview like Notes
    // line 1: bullet list of first few items
    // line 2: "X skills • Updated Feb 19"
    const top = items.slice(0, 4).join(" • ")
    return top
}
const ListViewItemStyles = styled.button({
    width: "100%",
    border: 0,
    background: "transparent",
    padding: "0.95rem 0.2rem",
    display: "grid",
    gap: "0.35rem",
    cursor: "default",
    borderBottom: `1px solid rgba(0,0,0,0.08)`,
    textAlign: "left",
    ":active": { background: "rgba(0,0,0,0.04)" },

    "& .top": {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "1rem",

        "&__title": {
            fontSize: "1.25rem",
            fontWeight: 900,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
        },

        "&__date": {
            fontSize: "1.0rem",
            fontWeight: 900,
            color: "rgba(17,24,39,0.55)",
            lineHeight: 1.1,
            flex: "0 0 auto",
        }
    },

    "& .preview": {
        fontSize: "1.05rem",
        fontWeight: 800,
        color: "rgba(17,24,39,0.55)",
        lineHeight: 1.25,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },

    "& .footer": {
        display: "flex",
        alignItems: "center",
        gap: "0.55rem",
        color: "rgba(17,24,39,0.55)",
        marginTop: "0.2rem",

        "&__badge": {
            width: "0.65rem",
            height: "0.65rem",
            borderRadius: "999px",
            background: `linear-gradient(180deg, #FDE68A, #FBBF24)`,
            boxShadow: "0 0 0 3px rgba(251,191,36,0.18)",
            flex: "0 0 auto",
        },

        "&__text": {
            fontSize: "0.98rem",
            fontWeight: 900,
        }
    }
})