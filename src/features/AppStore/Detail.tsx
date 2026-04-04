
import * as React from 'react'
import styled from 'styled-components'
import {
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ExternalLink,
    Github,
} from "lucide-react"

import type { Project } from 'types'
import { DifficultyDots } from './DifficultyDots'

export const Detail: React.FC<{
    project: Project
    onBack: () => void
    onOpenProject: (id: string) => void
}> = ({ project, onBack }) => {
    const [idx, setIdx] = React.useState(0)

    React.useEffect(() => setIdx(0), [project.id])

    const shots = project.screenshots.length ? project.screenshots : [project.cover]
    const canPrev = idx > 0
    const canNext = idx < shots.length - 1

    return (
        <DetailShell>
            <DetailTopbar>
                <BackBtn onClick={onBack} title="Back">
                    <ArrowLeft size={16} />
                    Back
                </BackBtn>

                <DetailTitle>{project.name}</DetailTitle>

                <DetailActions>
                    {project.links.github && (
                        <ActionBtn as="a" href={project.links.github} target="_blank" rel="noreferrer">
                            <Github size={16} />
                            GitHub
                        </ActionBtn>
                    )}
                    {project.links.live && (
                        <PrimaryBtn as="a" href={project.links.live} target="_blank" rel="noreferrer">
                            <ExternalLink size={16} />
                            View
                        </PrimaryBtn>
                    )}
                </DetailActions>
            </DetailTopbar>

            <DetailBody>
                <HeroRow>
                    <BigIcon src={project.icon} alt="" />
                    <HeroMeta>
                        <HeroName>{project.name}</HeroName>
                        <HeroSubtitle>{project.subtitle}</HeroSubtitle>
                        <HeroMetaRow>
                            <MetaPill>
                                Difficulty <DifficultyDots value={project.difficulty} />
                            </MetaPill>
                            {project.links.caseStudy && (
                                <MetaLink
                                    href={project.links.caseStudy}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Read case study <ExternalLink size={14} />
                                </MetaLink>
                            )}
                        </HeroMetaRow>
                    </HeroMeta>
                </HeroRow>

                <SliderCard>
                    <SliderTop>
                        <SliderTitle>Screenshots</SliderTitle>
                        <SliderControls>
                            <IconBtn disabled={!canPrev} onClick={() => setIdx((v) => Math.max(0, v - 1))}>
                                <ChevronLeft size={16} />
                            </IconBtn>
                            <SliderCount>
                                {idx + 1} / {shots.length}
                            </SliderCount>
                            <IconBtn disabled={!canNext} onClick={() => setIdx((v) => Math.min(shots.length - 1, v + 1))}>
                                <ChevronRight size={16} />
                            </IconBtn>
                        </SliderControls>
                    </SliderTop>

                    <SlideFrame>
                        <SlideImg src={shots[idx]} alt="" />
                        <SlideGloss aria-hidden="true" />
                    </SlideFrame>

                    <ThumbRow>
                        {shots.slice(0, 6).map((s, i) => (
                            <Thumb
                                key={`${s}-${i}`}
                                $active={i === idx}
                                onClick={() => setIdx(i)}
                                title={`Screenshot ${i + 1}`}
                            >
                                <ThumbImg src={s} alt="" />
                            </Thumb>
                        ))}
                    </ThumbRow>
                </SliderCard>

                <TwoCol>
                    <SectionCard>
                        <SectionTitle>Overview</SectionTitle>
                        <BodyText>{project.overview}</BodyText>

                        <SectionTitle style={{ marginTop: "1rem" }}>Highlights</SectionTitle>
                        <BulletList>
                            {project.highlights.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </BulletList>
                    </SectionCard>

                    <SectionCard>
                        <SectionTitle>Tech Stack</SectionTitle>
                        <Chips>
                            {project.techStack.map((t) => (
                                <Chip key={t}>{t}</Chip>
                            ))}
                        </Chips>

                        <SectionTitle style={{ marginTop: "1rem" }}>What I did</SectionTitle>
                        <BulletList>
                            {project.whatIDid.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </BulletList>
                    </SectionCard>
                </TwoCol>
            </DetailBody>
        </DetailShell>
    )
}

const ActionBtn = styled.a({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.75)",
    padding: "0.45rem 0.7rem",
    borderRadius: "0.8rem",
    cursor: "default",
    color: "#111827",
    textDecoration: "none",
})

const CardBase = {
    borderRadius: "1.1rem",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
}
const PillBase = {
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(0,0,0,0.04)",
    color: "#111827",
}

const DetailShell = styled.div({
    height: "100%",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
})

const DetailBody = styled.div({
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "1rem",
    paddingBottom: "1.5rem",
    WebkitOverflowScrolling: "touch",
})

const DetailTopbar = styled.div({
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.92)",
})

const BackBtn = styled.button({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.75)",
    padding: "0.45rem 0.6rem",
    borderRadius: "0.75rem",
    cursor: "default",
})

const DetailTitle = styled.div({
    fontWeight: 950,
    color: "#111827",
    textAlign: "center",
})

const DetailActions = styled.div({
    display: "inline-flex",
    gap: "0.5rem",
    justifyContent: "flex-end",
})

const PrimaryBtn = styled(ActionBtn)({
    background: "#2563eb",
    border: "1px solid rgba(37,99,235,0.35)",
    color: "#fff",
})

const HeroRow = styled.div({
    display: "grid",
    gridTemplateColumns: "4rem 1fr",
    gap: "0.9rem",
    alignItems: "center",
    marginBottom: "1rem",
})

const BigIcon = styled.img({
    width: "4rem",
    height: "4rem",
    borderRadius: "1.2rem",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(0,0,0,0.04)",
    objectFit: "cover",
})

const HeroMeta = styled.div({})

const HeroName = styled.div({
    fontSize: "1.55rem",
    fontWeight: 950,
    color: "#111827",
    lineHeight: 1.1,
})

const HeroSubtitle = styled.div({
    marginTop: "0.25rem",
    color: "#6b7280",
    fontSize: "0.95rem",
})

const HeroMetaRow = styled.div({
    marginTop: "0.7rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
})

const MetaPill = styled.div({
    ...PillBase,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.35rem 0.6rem",
    fontSize: "0.85rem",
})

const MetaLink = styled.a({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "0.9rem",
})

const SliderCard = styled.div({
    ...CardBase,
    borderRadius: "1.2rem",
    boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
    padding: "0.9rem",
    marginBottom: "1rem",
})

const SliderTop = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.65rem",
})

const SliderTitle = styled.div({
    fontWeight: 950,
    color: "#111827",
})

const SliderControls = styled.div({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
})

const IconBtn = styled.button({
    width: "2rem",
    height: "2rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.75)",
    display: "grid",
    placeItems: "center",
    cursor: "default",
    ":disabled": { opacity: 0.45, cursor: "not-allowed" },
})

const SliderCount = styled.div({
    minWidth: "5rem",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.9rem",
})

const SlideFrame = styled.div({
    position: "relative",
    borderRadius: "1rem",
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(0,0,0,0.03)",
})

const SlideImg = styled.img({
    width: "100%",
    height: "24rem",
    objectFit: "cover",
    display: "block",
})

const SlideGloss = styled.div({
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0))",
    pointerEvents: "none",
})

const ThumbRow = styled.div({
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.7rem",
    overflowX: "auto",
    paddingBottom: "0.2rem",
})

const Thumb = styled.button<{ $active: boolean }>((p) => ({
    border: p.$active
        ? "2px solid rgba(37,99,235,0.60)"
        : "1px solid rgba(0,0,0,0.12)",
    padding: 0,
    borderRadius: "0.75rem",
    overflow: "hidden",
    background: "transparent",
    width: "6.2rem",
    height: "3.6rem",
    cursor: "default",
}))

const ThumbImg = styled.img({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
})

const TwoCol = styled.div({
    display: "grid",
    gridTemplateColumns: "1.25fr 1fr",
    gap: "1rem",
    "@media (max-width: 900px)": {
        gridTemplateColumns: "1fr",
    },
})

const SectionCard = styled.div({
    ...CardBase,
    padding: "0.95rem",
})

const SectionTitle = styled.div({
    fontWeight: 950,
    color: "#111827",
    marginBottom: "0.5rem",
})

const BodyText = styled.div({
    color: "#374151",
    lineHeight: 1.5,
    fontSize: "0.95rem",
})

const BulletList = styled.ul({
    margin: 0,
    paddingLeft: "1.15rem",
    display: "grid",
    gap: "0.35rem",
    color: "#374151",
    lineHeight: 1.45,
})

const Chips = styled.div({
    display: "flex",
    flexWrap: "wrap",
    gap: "0.45rem",
})

const Chip = styled.div({
    ...PillBase,
    padding: "0.28rem 0.55rem",
    fontSize: "0.85rem",
})
