// components/windows/ProjectsStoreWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ExternalLink,
    Github,
} from "lucide-react"

type View = { type: "store" } | { type: "detail"; id: string }

type Project = {
    id: string
    name: string
    subtitle: string
    icon: string // /images/...
    difficulty: 1 | 2 | 3 | 4 | 5
    cover: string // big image shown on card
    screenshots: string[] // slider images
    overview: string
    highlights: string[]
    whatIDid: string[]
    techStack: string[]
    links: {
        github?: string
        live?: string
        caseStudy?: string
    }
}

const AppStore: React.FC = () => {
    const [view, setView] = React.useState<View>({ type: "store" })
    const [query, setQuery] = React.useState("")
    const [navId, setNavId] = React.useState<string>("store")

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return PROJECTS
        return PROJECTS.filter((p) => {
            const hay = `${p.name} ${p.subtitle} ${p.overview} ${p.techStack.join(" ")}`
            return hay.toLowerCase().includes(q)
        })
    }, [query])

    const openDetail = (id: string) => setView({ type: "detail", id })
    const goBack = () => setView({ type: "store" })

    const active = React.useMemo(() => {
        if (view.type !== "detail") return null
        return PROJECTS.find((p) => p.id === view.id) ?? null
    }, [view])

    return (
        <Shell>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>Projects</SidebarTitle>

                    <SearchWrap>
                        <Search size={14} />
                        <SearchInput
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search projects"
                        />
                    </SearchWrap>
                </SidebarHeader>

                <SidebarSectionLabel>Discover</SidebarSectionLabel>
                <SidebarList>
                    <SideRow
                        $active={navId === "store"}
                        onClick={() => {
                            setNavId("store")
                            goBack()
                        }}
                    >
                        Store
                    </SideRow>

                    <SideRow
                        $active={navId === "featured"}
                        onClick={() => setNavId("featured")}
                    >
                        Featured
                    </SideRow>

                    <SideRow
                        $active={navId === "new"}
                        onClick={() => setNavId("new")}
                    >
                        New
                    </SideRow>
                </SidebarList>

                <SidebarSectionLabel>Collections</SidebarSectionLabel>
                <SidebarList>
                    <SideRow
                        $active={navId === "case-studies"}
                        onClick={() => setNavId("case-studies")}
                    >
                        Case Studies
                    </SideRow>

                    <SideRow
                        $active={navId === "open-source"}
                        onClick={() => setNavId("open-source")}
                    >
                        Open Source
                    </SideRow>

                    <SideRow
                        $active={navId === "experiments"}
                        onClick={() => setNavId("experiments")}
                    >
                        Experiments
                    </SideRow>
                </SidebarList>

            </Sidebar>

            <Main>
                {view.type === "store" && (
                    <>
                        <Topbar>
                            <TopbarTitle>Explore</TopbarTitle>
                            <TopbarHint>{filtered.length} projects</TopbarHint>
                        </Topbar>

                        <StoreBody>
                            <Hero>
                                <HeroText>
                                    <HeroKicker>Featured</HeroKicker>
                                    <HeroTitle>Project Showcase</HeroTitle>
                                    <HeroSub>
                                        App Store style browsing. Click a card to open the app page.
                                    </HeroSub>
                                </HeroText>
                                <HeroBlock aria-hidden="true" />
                            </Hero>

                            <Grid>
                                {filtered.map((p) => (
                                    <Card key={p.id} onClick={() => openDetail(p.id)}>
                                        <CardTop>
                                            <CardIcon src={p.icon} alt="" />
                                            <div>
                                                <CardName>{p.name}</CardName>
                                                <CardSub>{p.subtitle}</CardSub>
                                            </div>
                                            <CardRight>
                                                <DifficultyDots value={p.difficulty} />
                                            </CardRight>
                                        </CardTop>

                                        <CardImageWrap>
                                            <CardImage src={p.cover} alt="" loading="lazy" />
                                            <CardImageGloss aria-hidden="true" />
                                        </CardImageWrap>
                                    </Card>
                                ))}
                            </Grid>
                        </StoreBody>
                    </>
                )}

                {view.type === "detail" && active && (
                    <Detail
                        project={active}
                        onBack={goBack}
                        onOpenProject={(id) => openDetail(id)}
                    />
                )}
            </Main>
        </Shell>
    )
}

export const AppStoreWindow = WindowWrapper(
    AppStore,
    "appStore", // change to "appstore" if you add a new window key
    "App Store"
)

/* ---------------- Detail Page ---------------- */

const Detail: React.FC<{
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

/* ---------------- Data (replace with yours) ---------------- */

const PROJECTS: Project[] = [
    {
        id: "builder",
        name: "Visual Builder",
        subtitle: "Drag-and-drop pages with SSR routing",
        icon: "/images/finder.png",
        difficulty: 5,
        cover: "/images/hero-placeholder.jpg",
        screenshots: ["/images/hero-placeholder.jpg", "/images/hero-placeholder.jpg"],
        overview:
            "A macOS-style visual builder that stores page documents, renders server-side for SEO, and supports structured components with constraints.",
        highlights: [
            "SSR-friendly page generation with publish/draft flows",
            "Component catalog + inspector editing model",
            "Designed for plugin-style extensions",
        ],
        whatIDid: [
            "Architected the monorepo + routing patterns",
            "Built the document schema and rendering pipeline",
            "Implemented UI patterns for selection + inspector editing",
        ],
        techStack: ["TypeScript", "React", "Vite", "Nx", "Node.js", "Express", "MySQL"],
        links: { github: "https://github.com/", live: "https://example.com" },
    },
    {
        id: "nexus",
        name: "Nexus",
        subtitle: "Portal + docs app for your ecosystem",
        icon: "/images/safari.png",
        difficulty: 4,
        cover: "/images/hero-placeholder.jpg",
        screenshots: ["/images/hero-placeholder.jpg"],
        overview:
            "A portal experience for navigating apps, docs, and internal tools with a cohesive UI kit and routing strategy.",
        highlights: [
            "Reusable component system for app shells",
            "Storybook integration for UI development",
            "Consistent navigation patterns across apps",
        ],
        whatIDid: [
            "Designed UI primitives + layout rules",
            "Integrated docs + component explorer workflows",
            "Built app shell patterns for multiple experiences",
        ],
        techStack: ["TypeScript", "React", "Storybook", "Vite", "Styled Components"],
        links: { github: "https://github.com/" },
    },
]

/* ---------------- Apple-ish styles ---------------- */

const Shell = styled.div({
    display: "grid",
    gridTemplateColumns: "17rem 1fr",
    height: "48rem",
})

const Sidebar = styled.aside({
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

const Main = styled.main({
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: "#fff",
})

const Topbar = styled.div({
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    padding: "0.85rem 1rem",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.92)",
})

const TopbarTitle = styled.div({
    fontSize: "1.15rem",
    fontWeight: 900,
    color: "#111827",
})

const TopbarHint = styled.div({
    fontSize: "0.85rem",
    color: "#6b7280",
})

const StoreBody = styled.div({
    flex: 1,
    overflow: "auto",
    padding: "1rem",
})

const Hero = styled.div({
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "1.2rem",
    border: "1px solid rgba(0,0,0,0.08)",
    background:
        "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(0,0,0,0.02))",
    boxShadow: "0 18px 35px rgba(0,0,0,0.08)",
    marginBottom: "1rem",
})

const HeroText = styled.div({
    display: "grid",
    alignContent: "start",
    gap: "0.3rem",
})

const HeroKicker = styled.div({
    fontSize: "0.78rem",
    fontWeight: 900,
    color: "#2563eb",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
})

const HeroTitle = styled.div({
    fontSize: "1.6rem",
    fontWeight: 950,
    color: "#111827",
})

const HeroSub = styled.div({
    fontSize: "0.95rem",
    color: "#374151",
    lineHeight: 1.35,
})

const HeroBlock = styled.div({
    borderRadius: "1rem",
    background: "rgba(0,0,0,0.06)",
})

const Grid = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
    gap: "1rem",
})

const Card = styled.button({
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    borderRadius: "1.25rem",
    padding: "0.9rem",
    textAlign: "left",
    cursor: "default",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
    transition: "transform 140ms ease, box-shadow 140ms ease"
})

const CardTop = styled.div({
    display: "grid",
    gridTemplateColumns: "3.1rem 1fr auto",
    gap: "0.7rem",
    alignItems: "center",
})

const CardIcon = styled.img({
    width: "3.1rem",
    height: "3.1rem",
    borderRadius: "0.95rem",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(0,0,0,0.04)",
    objectFit: "cover",
})

const CardName = styled.div({
    fontWeight: 950,
    color: "#111827",
    fontSize: "1rem",
    lineHeight: 1.1,
})

const CardSub = styled.div({
    marginTop: "0.2rem",
    color: "#6b7280",
    fontSize: "0.88rem",
    lineHeight: 1.2,
})

const CardRight = styled.div({
    display: "grid",
    justifyItems: "end",
    gap: "0.25rem",
})

const CardImageWrap = styled.div({
    marginTop: "0.85rem",
    borderRadius: "1rem",
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(0,0,0,0.03)",
    position: "relative",
})

const CardImage = styled.img({
    width: "100%",
    height: "11rem",
    objectFit: "cover",
    display: "block",
})

const CardImageGloss = styled.div({
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0))",
    pointerEvents: "none",
})

/* ---------------- Difficulty dots ---------------- */

const DifficultyDots: React.FC<{ value: 1 | 2 | 3 | 4 | 5 }> = ({ value }) => {
    return (
        <Dots aria-label={`Difficulty ${value} of 5`}>
            {new Array(5).fill(0).map((_, i) => (
                <Dot key={i} $on={i < value} />
            ))}
        </Dots>
    )
}

const Dots = styled.div({
    display: "flex",
    gap: "0.25rem",
})

const Dot = styled.div<{ $on: boolean }>((p) => ({
    width: "0.45rem",
    height: "0.45rem",
    borderRadius: "999px",
    background: p.$on ? "rgba(17,24,39,0.75)" : "rgba(0,0,0,0.14)",
}))

/* ---------------- Detail styles ---------------- */

const DetailShell = styled.div({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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

const PrimaryBtn = styled(ActionBtn)({
    background: "#2563eb",
    border: "1px solid rgba(37,99,235,0.35)",
    color: "#fff",
})

const DetailBody = styled.div({
    flex: 1,
    overflow: "auto",
    padding: "1rem",
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
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.35rem 0.6rem",
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(0,0,0,0.03)",
    color: "#111827",
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
    borderRadius: "1.2rem",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
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
    borderRadius: "1.1rem",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
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
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(0,0,0,0.04)",
    padding: "0.28rem 0.55rem",
    fontSize: "0.85rem",
    color: "#111827",
})
