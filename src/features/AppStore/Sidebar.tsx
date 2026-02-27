
import { Search } from 'components/base/Search'
import * as React from 'react'
import styled from 'styled-components'

interface SidebarProps {
    query: string
    setQuery: (args: string) => void
    goBack: () => void
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const { goBack } = props
    const [navId, setNavId] = React.useState<string>("store")

    return (
        <SidebarStyles>
            <div className='header'>
                <SidebarTitle>Projects</SidebarTitle>
                <Search {...props} />
            </div>

            <SidebarList 
                title='Discover'
                setNavId={setNavId}
                goBack={goBack}
                listItems={[
                    {
                        id: "store",
                        active: navId === "store",
                        text: "Store"
                    },
                    {
                        id: "featured",
                        active: navId === "featured",
                        text: "Featured"
                    },
                    {
                        id: "new",
                        active: navId === "new",
                        text: "New"
                    },
                ]}
            />

            <SidebarList 
                title='Collections'
                setNavId={setNavId}
                goBack={goBack}
                listItems={[
                    {
                        id: "case-studies",
                        active: navId === "case-studies",
                        text: "Case Studies"
                    },
                    {
                        id: "open-source",
                        active: navId === "open-source",
                        text: "Open Source"
                    },
                    {
                        id: "experiments",
                        active: navId === "experiments",
                        text: "Experiments"
                    },
                ]}
            />

        </SidebarStyles>
    )
}

interface SidebarListItem {
    active: boolean
    id: string
    text: string
}

interface SidebarListProps {
    setNavId: (args: string) => void
    title: string
    listItems: SidebarListItem[]
    goBack: () => void
}

const SidebarList: React.FC<SidebarListProps> = (props) => {
    const { setNavId, title, listItems, goBack } = props


    return (
        <>
            <SidebarSectionLabel>{title}</SidebarSectionLabel>
            <SidebarListStyles>
                {listItems.map(dataSet => (
                    <SideRow 
                        key={dataSet.id}
                        $active={dataSet.active}
                        onClick={() => {
                            setNavId(dataSet.id)
                            if (!dataSet.active) goBack()
                        }}
                    >
                        {dataSet.text}
                    </SideRow>
                ))}
            </SidebarListStyles>
        </>
    )
}

const SidebarStyles = styled.aside({
    borderRight: "1px solid rgba(0,0,0,0.10)",
    padding: "0.8rem",
    overflow: "auto",

    "& .header": {
        "& :not(:last-child)": {
            marginBottom: "0.6rem"
        }
    }
})


const SidebarTitle = styled.div({
    fontWeight: 900,
    fontSize: "0.95rem",
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


const SidebarListStyles = styled.div({
    display: "grid",
    gap: "0.25rem",
})

const SideRow = styled.button<{ $active: boolean }>((p) => ({
    border: 0,
    textAlign: "left",
    padding: "0.5rem 0.6rem",
    borderRadius: "0.75rem",
    cursor: "default",
    background: p.$active ? "rgba(59,130,246,0.14)" : "transparent",
    color: "rgba(17,24,39,0.95)",
    ":hover": {
        background: p.$active ? "rgba(59,130,246,0.14)" : "rgba(0,0,0,0.05)",
    },
}))
