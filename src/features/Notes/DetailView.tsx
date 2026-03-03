
import * as React from 'react'
import styled from 'styled-components'
import { ChevronLeft } from "lucide-react"
import type { ViewState } from './state'
import { formatDate } from 'utils/date'
import { techStack } from 'config'

interface ListViewProps {
    viewState: Extract<ViewState, { view: "detail" }>
    setView: (args: ViewState) => void
}

export const DetailView: React.FC<ListViewProps> = (props) => {
    const { viewState, setView } = props

    const detailInfo = React.useMemo(() => techStack.find(dataSet => dataSet.id == viewState.id), [viewState.id])

    const back = () => setView({ view: "list" })

    const dateLabel = React.useMemo(() => formatDate(detailInfo?.lastUpdated || new Date()), [detailInfo?.lastUpdated])

    if (!detailInfo) return <DetailViewStyles>unable to load</DetailViewStyles>

    return (
        <DetailViewStyles>
            <div className='top'>
                <button className='top__back' type="button" onClick={back} aria-label="Back">
                    <ChevronLeft size={20} />
                    <span>Notes</span>
                </button>
            </div>

            <div className='detail'>
                <h3 className='detail__title'>{detailInfo.category}</h3>
                <span className='detail__meta'>
                    {detailInfo.items.length} skills • Updated {dateLabel}
                </span>

                <div className='detail__divider' />

                <div className='detail__body'>
                    <h5 className='detail__body--title'>Skills</h5>
                    <ul className='bullets'>
                        {detailInfo.items.map((it) => (
                            <li key={it}>
                                <span className='bullets__dot' />
                                <span className='bullets__text'>{it}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </DetailViewStyles>
    )
}

const DetailViewStyles = styled.div({
    padding: "1rem",

    "& .top": {
        // padding: "0.85rem 0.85rem 0.5rem",
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        // gap: "0.75rem",
        borderBottom: `1px solid rgba(0,0,0,0.08)`,
        paddingBottom: "2rem",

        "&__back": {
            border: 0,
            background: "transparent",
            color: "#FBBF24",
            display: "flex",
            alignItems: "center",
            // gap: "0.15rem",
            fontWeight: 900,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
            padding: "0.35rem 0.25rem",
            cursor: "default",
            ":active": { opacity: 0.7 },
            span: { transform: "translateY(0.5px)" },
        },
    },

    "& .detail": {
        paddingLeft: "1rem",

        "&__title": {
            fontSize: "2.05rem",
            fontWeight: 950,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
        },

        "&__meta": {
            marginTop: "0.35rem",
            fontSize: "1.05rem",
            fontWeight: 900,
            color: "rgba(17,24,39,0.55)",
        },

        "&__divider": {
            height: 1,
            background: "rgba(0,0,0,0.08)",
            margin: "1.0rem 0 1.0rem",
        },

        "&__body": {
            display: "grid",
            gap: "1rem",

            "&--title": {
                fontSize: "1.1rem",
                fontWeight: 950,
                letterSpacing: "-0.01em",
            }
        }
    },

    "& .bullets": {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gap: "0.75rem",

        "&__dot": {
            width: "0.55rem",
            height: "0.55rem",
            borderRadius: "999px",
            background: `linear-gradient(180deg, #FBBF24, #FDE68A)`,
            boxShadow: "0 0 0 3px rgba(251,191,36,0.16)",
            flex: "0 0 auto",
            marginTop: "0.35rem",
        },

        "&__text": {
            fontSize: "1.1rem",
            fontWeight: 900,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
        }
    }
})
