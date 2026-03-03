
import * as React from 'react'
import styled from 'styled-components'

import { resumes } from "config"
import type { Route } from './types'

interface LibraryProps {
    setActiveId: (args: string) => void
    setRoute: (args: Route) => void
}

export const Library: React.FC<LibraryProps> = (props) => {
    const { setActiveId, setRoute } = props
    const [query, setQuery] = React.useState("")

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return resumes
        return resumes.filter((r) => r.title.toLowerCase().includes(q))
    }, [query])

    const openReader = (id: string) => {
        setActiveId(id)
        setRoute("reader")
    }

    return (
        <LibraryStyles>
            <div className='search__container'>
                <input
                    className='search__input'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    aria-label="Search resumes"
                />
            </div>

            <div className='content'>
                {filtered.map((r) => (
                    <Book key={r.id} type="button" onClick={() => openReader(r.id)}>
                        <div className='cover'>
                            <div className='cover__jacket'>
                                <h5 className='cover__title'>{r.title}</h5>
                                <span className='cover__sub'>PDF</span>
                            </div>
                        </div>
                    </Book>
                ))}
            </div>
        </LibraryStyles>
    )
}


const LibraryStyles = styled.div({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
    color: "#111827",
    padding: "0.8rem 0.9rem 0.4rem",

    "& .search": {
        "&__container": {
        },

        "&__input": {
            width: "100%",
            borderRadius: "0.85rem",
            border: "1px solid rgba(0,0,0,0.12)",
            padding: "0.65rem 0.85rem",
            outline: "none",
            fontWeight: 600,
        }
    },

    "& .content": {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "1rem 0.8rem",
        overflow: "auto",
        paddingLeft: "1.2rem",
        paddingRight: "1.2rem",
    }
})


const Book = styled.button({
    border: 0,
    background: "transparent",
    padding: 0,
    textAlign: "left",
    cursor: "default",

    "& .cover": {
        width: "100%",
        aspectRatio: "3 / 4",
        borderRadius: "0.9rem",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.10)",
        boxShadow: "0 14px 28px rgba(0,0,0,0.12)",
        color: "#111827",

        "&__jacket": {
            height: "100%",
            padding: "0.75rem",
            display: "grid",
            alignContent: "space-between",
            background: "linear-gradient(180deg,#02a472,#f3f4f6)",
        },

        "&__title": {
            fontWeight: 900,
            fontSize: "0.95rem",
            lineHeight: 1.15,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
        },

        "&__sub": {
            fontWeight: 800,
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            color: "rgba(17,24,39,0.45)",

        }
    }
})