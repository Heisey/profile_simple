
import * as React from 'react'
import styled from 'styled-components'
import {
    Search as SearchIcon
} from "lucide-react"

interface SearchProps {
    query: string
    setQuery: (args: string) => void
}

export const Search: React.FC<SearchProps> = (props) => {
    const { query, setQuery } = props

    return (
        <SearchStyles>
            <SearchIcon className='icon' size={14} />
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search projects"
            />
        </SearchStyles>
    )
}


const SearchStyles = styled.div({
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.25rem 0.55rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(0,0,0,0.10)",
    color: "#6b7280",

    "& .icon": {
        marginTop: "0.3rem",
    },

    "input": {
        border: 0,
        outline: "none",
        background: "transparent",
        width: "100%",
        fontSize: "0.9rem",
        color: "#111827",
        marginTop: "-0.2rem"
    }
})