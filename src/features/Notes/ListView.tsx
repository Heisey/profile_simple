
import * as React from 'react'
import styled from 'styled-components'
import { Search } from "lucide-react"

import { techStack } from "config"
import { ListViewItem } from './ListViewItem'
import type { ViewState } from './state'
import { formatDate } from 'utils/date'

interface ListViewProps {
    setView: (args: ViewState) => void
}

export const ListView: React.FC<ListViewProps> = (props) => {
    const { setView } = props
    const [query, setQuery] = React.useState("")

    const filtered = React.useMemo(() => {
        const trimedQuery = query.trim().toLowerCase()
        if (!trimedQuery) return techStack

        return techStack.filter((g) => {
            const hay = (g.category + " " + g.items.join(" ")).toLowerCase()
            return hay.includes(trimedQuery)
        })
    }, [query])

    const now = React.useMemo(() => new Date(), [])
    const dateLabel = React.useMemo(() => formatDate(now), [now])

    return (
        <ListViewStyles>
            <div className='header'>
                <div className='header__left'>
                    <h3 className='header__left--title'>Notes</h3>
                    <span className='header__left--sub'>{dateLabel}</span>
                </div>

                <div className='header__right'>
                    <div className='search'>
                        <Search size={18} />
                        <input
                            className='search__input'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search notes"
                        />
                    </div>
                </div>
            </div>

            <div className='list'>
                {filtered.map((dataSet) => (
                    <ListViewItem techStackGroup={dataSet} setView={setView} />
                ))}
            </div>
        </ListViewStyles>
    )
}

const ListViewStyles = styled.div({
    "& .header": {
        padding: "1.1rem 1.1rem 0.65rem",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",

        "&__left": {
            display: "grid",
            gap: "0.2rem",

            "&--title": {
                fontSize: "2.35rem",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.02em",
            },

            "&--sub": {
                fontSize: "1.55rem",
                fontWeight: 800,
                color: "rgba(17,24,39,0.55)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
            }
        },

        "&__right": {
            marginTop: "0.3rem",
        },
    },

    "& .search": {
        height: "2.6rem",
        borderRadius: "999px",
        background: "rgba(0,0,0,0.06)",
        border: `1px solid rgba(0,0,0,0.08)`,
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
        padding: "0 0.7rem",
        color: "rgba(17,24,39,0.8)",
        minWidth: "14rem",

        "&__input": {
            appearance: "none",
            border: 0,
            outline: "none",
            background: "transparent",
            color: "#111827",
            fontSize: "1.05rem",
            fontWeight: 800,
            width: "9.5rem",
            "::placeholder": { color: "rgba(17,24,39,0.55)", fontWeight: 800 },
        }
    },

    "& .list": {
        minHeight: 0,
        width: "100%",
        padding: "0.25rem 0.9rem 1rem",
        overflow: "auto",
    }
})