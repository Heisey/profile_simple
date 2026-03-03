
import * as React from 'react'
import styled from 'styled-components'
import {
    Search,
} from "lucide-react"

import { CONTACT } from 'config'
import type { Pane } from './types'

interface SidebarProps {
    pane: Pane
    setPane: (args: Pane) => void
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const { pane, setPane } = props

    const [query, setQuery] = React.useState("")

    const items = React.useMemo(() => {
        const base = [
            { id: "me", label: CONTACT.name, kind: "person" as const },
            { id: "socials", label: "Socials", kind: "folder" as const },
        ]

        const q = query.trim().toLowerCase()

        if (!q) return base

        return base.filter((x) => x.label.toLowerCase().includes(q))
    }, [query])

    return (
        <SidebarStyles>
            <SidebarHeader>
                <SidebarTitle>Contacts</SidebarTitle>

                <SearchWrap>
                    <Search size={14} />
                    <SearchInput
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        aria-label="Search contacts"
                    />
                </SearchWrap>
            </SidebarHeader>

            <SidebarSectionLabel>Cards</SidebarSectionLabel>
            <SidebarList>
                {items.some((x) => x.id === "me") && (
                    <SideRow
                        type="button"
                        $active={pane === "card"}
                        onClick={() => setPane("card")}
                    >
                        <DotAvatar aria-hidden="true" />
                        <div>
                            <SideRowTitle>{CONTACT.name}</SideRowTitle>
                            <SideRowSub>{CONTACT.subtitle}</SideRowSub>
                        </div>
                    </SideRow>
                )}
            </SidebarList>

            <SidebarSectionLabel>Quick Links</SidebarSectionLabel>
            <SidebarList>
                {items.some((x) => x.id === "socials") && (
                    <SideRow
                        type="button"
                        $active={pane === "socials"}
                        onClick={() => setPane("socials")}
                    >
                        <FolderIcon aria-hidden="true" />
                        <div>
                            <SideRowTitle>Socials</SideRowTitle>
                            <SideRowSub>Links & profiles</SideRowSub>
                        </div>
                    </SideRow>
                )}
            </SidebarList>
        </SidebarStyles>
    )
}


const SidebarStyles = styled.aside({
    borderRight: "1px solid rgba(0,0,0,0.10)",
    background: "#f9fafb",
    padding: "0.8rem",
    overflow: "auto",
})

const SidebarHeader = styled.div({
    display: "grid",
    gap: "0.6rem",
    marginBottom: "0.9rem",
})

const SidebarTitle = styled.div({
    fontWeight: 900,
    fontSize: "0.95rem",
    color: "#111827",
})

const SearchWrap = styled.div({
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.45rem 0.55rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.75)",
    color: "#6b7280",
})

const SearchInput = styled.input({
    border: 0,
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: "0.9rem",
    color: "#111827",
})

const SidebarSectionLabel = styled.div({
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b7280",
    marginTop: "0.9rem",
    marginBottom: "0.35rem",
})

const SidebarList = styled.div({
    display: "grid",
    gap: "0.25rem",
})

const SideRow = styled.button<{ $active: boolean }>((p) => ({
    border: 0,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1.6rem 1fr",
    gap: "0.6rem",
    alignItems: "center",
    textAlign: "left",
    padding: "0.55rem 0.6rem",
    borderRadius: "0.85rem",
    cursor: "default",
    background: p.$active ? "rgba(59,130,246,0.14)" : "transparent",
    color: "rgba(17,24,39,0.95)",
    ":hover": {
        background: p.$active ? "rgba(59,130,246,0.14)" : "rgba(0,0,0,0.05)",
    },
}))

const SideRowTitle = styled.div({
    fontWeight: 900,
    fontSize: "0.9rem",
    color: "#111827",
    lineHeight: 1.1,
})

const SideRowSub = styled.div({
    marginTop: "0.12rem",
    fontSize: "0.78rem",
    color: "#6b7280",
    lineHeight: 1.15,
})

const DotAvatar = styled.div({
    width: "1.35rem",
    height: "1.35rem",
    borderRadius: "999px",
    background:
        "linear-gradient(180deg, rgba(59,130,246,0.80), rgba(37,99,235,0.80))",
    boxShadow: "0 6px 14px rgba(37,99,235,0.22)",
})

const FolderIcon = styled.div({
    width: "1.35rem",
    height: "1.1rem",
    borderRadius: "0.35rem",
    background: "rgba(0,0,0,0.12)",
})
