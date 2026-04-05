
import { WindowWrapper } from 'components/hoc/WindowWrapper'
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from 'lucide-react'
import * as React from 'react'
import styled from 'styled-components'
import { blogPosts } from 'config'
import { IOSWindowWrapper } from 'components/hoc/IOSWindowWrapper/IOSWindowWrapper'

const Safari: React.FC = () => {

    return (
        <SafariStyles>
            <h2>Developer Articls</h2>

            <div className='blog'>
                {blogPosts.map(dataSet => (
                    <div key={dataSet.id} className='post'>
                        <div className='image_container'>
                            <img src={dataSet.image} alt={dataSet.title} />
                        </div>

                        <div className='content_container'>
                            <p>{dataSet.date}</p>
                            <h3>{dataSet.title}</h3>
                            <a href={dataSet.link} target="_blank" rel="noopener">
                                Check out the article
                                <MoveRight className='icon' />
                            </a>

                        </div>
                    </div>
                ))}
            </div>
        </SafariStyles>
    )
}

const SafariHeader: React.FC = () => {

    return (
        <SafariHeaderStyles>
            <PanelLeft className='icon' style={{ marginLeft: "2.5rem" }} />

            <div className='nav'>
                <ChevronLeft className='icon' />
                <ChevronRight className='icon' />
            </div>

            <div className='searchContainer'>
                <ShieldHalf className='icon' />

                <div className='search'>
                    <Search className='icon' />

                    <input
                        type="text"
                        placeholder='Search or enter url'
                    />
                </div>
            </div>

            <div className='controls'>
                <Share className='icon' />
                <Plus className='icon' />
                <Copy className='icon' />
            </div>
        </SafariHeaderStyles>
    )
}

export const SafariMacOsWindow = WindowWrapper(Safari, "safari", <SafariHeader />)
export const SafariIosWindow = IOSWindowWrapper(Safari, "safari")

const SafariStyles = styled.div({
    height: "100%",
    minHeight: 0,
    maxHeight: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",

    scrollbarWidth: "none",     // Firefox
    msOverflowStyle: "none",    // old Edge/IE

    "&::-webkit-scrollbar": {
        display: "none",        // Chrome, Safari
    },

    padding: "1.25rem 1rem 1.5rem",
    boxSizing: "border-box",

    maxWidth: "48rem",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",

    "& h2": {
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "#db2777",
        marginBottom: "2rem",
    },

    "& .blog": {
        "& > * + *": {
            marginTop: "1.75rem"
        },

        "& .post": {
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",

            "& > * + *": {
                marginLeft: "1.25rem"
            },

            "& .image_container": {
                gridColumn: "span 2 / span 2",

                "& img": {
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.375rem",
                    objectFit: "cover"
                }
            },

            "& .content_container": {
                gridColumn: "span 10 / span 10",
                minWidth: 0,

                "& > * + *": {
                    marginTop: "0.75rem"
                },

                "& p": {
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    color: "#6b7280",
                },

                "& h3": {
                    fontWeight: 600,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    color: "#1f2937",
                },

                "& a": {
                    color: "#2563eb",
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textDecoration: "none",

                    "&:hover": {
                        textDecoration: "underline",
                    }
                }
            }
        }
    }
})

const SafariHeaderStyles = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // ✅ was space-between

    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
    borderBottom: "1px solid #e5e7eb",
    userSelect: "none",
    fontSize: "0.875rem",
    color: "#9ca3af",
    width: "100%",

    ".icon": {
        paddingX: "0.25rem",
        borderRadius: "0.25rem",
        display: "block",
        "&:hover": { backgroundColor: "#e5e7eb", cursor: "default" },
    },

    ".nav": {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",      // gap-1
        marginLeft: "1.25rem" // ml-5
    },

    "& .searchContainer": {
        // ✅ this is the "flex-1 flex-center gap-3" part
        flex: "1 1 0%",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem", // gap-3
        marginLeft: "1rem", // keeps it from hugging the nav
        width: "66.666667%", // w-2/3

        ".search": {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",

            border: "1px solid #d1d5db",
            borderRadius: "0.75rem",
            paddingX: "0.6rem",
            borderColor: "#e5e7eb",


            // ✅ input reset (this is why it looks “off”)
            "input": {
                flex: "1 1 0%",
                width: "100%",
                border: 0,
                outline: "none",
                background: "transparent",
                fontSize: "0.875rem",
                color: "#111827",
                minWidth: 0, // important inside flex
            },

            "input::placeholder": {
                color: "#9ca3af",
            },
        },
    },

    "& .controls": {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
    }
})
