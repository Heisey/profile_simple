// components/windows/SkillsNotesIosWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { Search, MoreHorizontal, ChevronLeft } from "lucide-react"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"
import { techStack, type TechStackGroup } from "config"

type NotesTheme = "light" | "dark"
const NOTES_THEME: NotesTheme = "light" // wire to your global theme later

const notesColors = (mode: NotesTheme) => {
  const light = {
    bg: "#ffffff",
    text: "#111827",
    subText: "rgba(17,24,39,0.55)",
    divider: "rgba(0,0,0,0.08)",
    active: "rgba(0,0,0,0.04)",
    pillBg: "rgba(0,0,0,0.06)",
    pillBorder: "rgba(0,0,0,0.08)",
    pillText: "rgba(17,24,39,0.8)",
    dotBg: "rgba(0,0,0,0.06)",
    yellow: "#FDE68A",
    yellow2: "#FBBF24",
    cardBg: "rgba(0,0,0,0.02)",
  }

  const dark = {
    bg: "#000000",
    text: "#ffffff",
    subText: "rgba(255,255,255,0.55)",
    divider: "rgba(255,255,255,0.12)",
    active: "rgba(255,255,255,0.05)",
    pillBg: "rgba(255,255,255,0.12)",
    pillBorder: "rgba(255,255,255,0.12)",
    pillText: "rgba(255,255,255,0.9)",
    dotBg: "rgba(255,255,255,0.10)",
    yellow: "#F59E0B",
    yellow2: "#FBBF24",
    cardBg: "rgba(255,255,255,0.06)",
  }

  return mode === "light" ? light : dark
}

type ViewState =
  | { view: "list" }
  | { view: "detail"; category: string; items: string[] }

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(d)

const makePreview = (items: string[]) => {
  // two-line-ish preview like Notes
  // line 1: bullet list of first few items
  // line 2: "X skills • Updated Feb 19"
  const top = items.slice(0, 4).join(" • ")
  return top
}

const SkillsNotesIosApp: React.FC = () => {

  const [state, setState] = React.useState<ViewState>({ view: "list" })
  const [q, setQ] = React.useState("")

  const now = React.useMemo(() => new Date(), [])
  const dateLabel = React.useMemo(() => formatDate(now), [now])

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return techStack

    return techStack.filter((g) => {
      const hay = (g.category + " " + g.items.join(" ")).toLowerCase()
      return hay.includes(query)
    })
  }, [q])

  const openNote = (g: TechStackGroup) =>
    setState({ view: "detail", category: g.category, items: g.items })

  const back = () => setState({ view: "list" })

  return (
    <Shell>
      {state.view === "list" ? (
        <>
          <Header>
            <HeaderLeft>
              <Title>Notes</Title>
              <SubTitle>{dateLabel}</SubTitle>
            </HeaderLeft>

            <HeaderRight>
              <SearchPill>
                <Search size={18} />
                <SearchInput
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search"
                  aria-label="Search notes"
                />
                <DotBtn aria-label="More">
                  <MoreHorizontal size={18} />
                </DotBtn>
              </SearchPill>
            </HeaderRight>
          </Header>

          <List>
            {filtered.map((g) => (
              <Row key={g.category} type="button" onClick={() => openNote(g)}>
                <RowTop>
                  <RowTitle>{g.category}</RowTitle>
                  <RowMeta>{dateLabel}</RowMeta>
                </RowTop>

                <RowPreview>{makePreview(g.items)}</RowPreview>

                <RowFooter>
                  <Badge aria-hidden />
                  <FooterText>
                    {g.items.length} skills • iOS Notes-style
                  </FooterText>
                </RowFooter>
              </Row>
            ))}
          </List>
        </>
      ) : (
        <>
          <DetailTopbar>
            <BackBtn type="button" onClick={back} aria-label="Back">
              <ChevronLeft size={20} />
              <span>Notes</span>
            </BackBtn>

            <DetailRight>
              <CircleBtn aria-label="More">
                <MoreHorizontal size={18} />
              </CircleBtn>
            </DetailRight>
          </DetailTopbar>

          <Detail>
            <DetailTitle>{state.category}</DetailTitle>
            <DetailMeta>
              {state.items.length} skills • Updated {dateLabel}
            </DetailMeta>

            <Divider />

            <DetailBody>
              <SectionTitle>Skills</SectionTitle>
              <Bullets>
                {state.items.map((it) => (
                  <li key={it}>
                    <BulletDot />
                    <BulletText>{it}</BulletText>
                  </li>
                ))}
              </Bullets>

              <HintCard>
                <HintTitle>How I use this stack</HintTitle>
                <HintText>
                  I build typed, component-driven UIs, ship production APIs, and
                  keep systems maintainable with clean contracts and tooling.
                </HintText>
              </HintCard>
            </DetailBody>
          </Detail>
        </>
      )}
    </Shell>
  )
}

export const NotesIosWindow = IOSWindowWrapper(SkillsNotesIosApp, "notes")

/* ---------------- styles ---------------- */

const Shell = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    width: "100%",
    height: "100%",
    minHeight: 0,
    background: c.bg,
    color: c.text,
    display: "grid",
    gridTemplateRows: "auto 1fr",
  }
})

const Header = styled.div({
  padding: "1.1rem 1.1rem 0.65rem",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
})

const HeaderLeft = styled.div({
  display: "grid",
  gap: "0.2rem",
})

const Title = styled.div({
  fontSize: "2.35rem",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "-0.02em",
})

const SubTitle = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    fontSize: "1.55rem",
    fontWeight: 800,
    color: c.subText,
    lineHeight: 1,
    letterSpacing: "-0.02em",
  }
})

const HeaderRight = styled.div({
  marginTop: "0.3rem",
})

const SearchPill = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    height: "2.6rem",
    borderRadius: "999px",
    background: c.pillBg,
    border: `1px solid ${c.pillBorder}`,
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    padding: "0 0.7rem",
    color: c.pillText,
    minWidth: "14rem",
  }
})

const SearchInput = styled.input(() => {
  const c = notesColors(NOTES_THEME)
  return {
    appearance: "none",
    border: 0,
    outline: "none",
    background: "transparent",
    color: c.text,
    fontSize: "1.05rem",
    fontWeight: 800,
    width: "9.5rem",
    "::placeholder": { color: c.subText, fontWeight: 800 },
  }
})

const DotBtn = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    width: "2.05rem",
    height: "2.05rem",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    background: c.dotBg,
    marginLeft: "0.1rem",
    flex: "0 0 auto",
  }
})

const List = styled.div({
  minHeight: 0,
  width: "100%",
  padding: "0.25rem 0.9rem 1rem",
  overflow: "auto",
})

const Row = styled.button(() => {
  const c = notesColors(NOTES_THEME)
  return {
    width: "100%",
    border: 0,
    background: "transparent",
    padding: "0.95rem 0.2rem",
    display: "grid",
    gap: "0.35rem",
    cursor: "default",
    borderBottom: `1px solid ${c.divider}`,
    textAlign: "left",
    ":active": { background: c.active },
  }
})

const RowTop = styled.div({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "1rem",
})

const RowTitle = styled.div({
  fontSize: "1.25rem",
  fontWeight: 900,
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
})

const RowMeta = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    fontSize: "1.0rem",
    fontWeight: 900,
    color: c.subText,
    lineHeight: 1.1,
    flex: "0 0 auto",
  }
})

const RowPreview = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: c.subText,
    lineHeight: 1.25,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }
})

const RowFooter = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    color: c.subText,
    marginTop: "0.2rem",
  }
})

const Badge = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    width: "0.65rem",
    height: "0.65rem",
    borderRadius: "999px",
    background: `linear-gradient(180deg, ${c.yellow2}, ${c.yellow})`,
    boxShadow: "0 0 0 3px rgba(251,191,36,0.18)",
    flex: "0 0 auto",
  }
})

const FooterText = styled.div({
  fontSize: "0.98rem",
  fontWeight: 900,
})

/* --------- detail view --------- */

const DetailTopbar = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    padding: "0.85rem 0.85rem 0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    borderBottom: `1px solid ${c.divider}`,
  }
})

const BackBtn = styled.button(() => {
  const c = notesColors(NOTES_THEME)
  return {
    border: 0,
    background: "transparent",
    color: c.yellow2,
    display: "flex",
    alignItems: "center",
    gap: "0.15rem",
    fontWeight: 900,
    fontSize: "1.05rem",
    letterSpacing: "-0.01em",
    padding: "0.35rem 0.25rem",
    cursor: "default",
    ":active": { opacity: 0.7 },
    span: { transform: "translateY(0.5px)" },
  }
})

const DetailRight = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const CircleBtn = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    width: "2.05rem",
    height: "2.05rem",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    background: c.dotBg,
    color: c.pillText,
  }
})

const Detail = styled.div({
  minHeight: 0,
  overflow: "auto",
  padding: "1.1rem 1.1rem 1.5rem",
})

const DetailTitle = styled.div({
  fontSize: "2.05rem",
  fontWeight: 950,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
})

const DetailMeta = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    marginTop: "0.35rem",
    fontSize: "1.05rem",
    fontWeight: 900,
    color: c.subText,
  }
})

const Divider = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    height: 1,
    background: c.divider,
    margin: "1.0rem 0 1.0rem",
  }
})

const DetailBody = styled.div({
  display: "grid",
  gap: "1rem",
})

const SectionTitle = styled.div({
  fontSize: "1.1rem",
  fontWeight: 950,
  letterSpacing: "-0.01em",
})

const Bullets = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: "0.75rem",
})

const BulletDot = styled.span(() => {
  const c = notesColors(NOTES_THEME)
  return {
    width: "0.55rem",
    height: "0.55rem",
    borderRadius: "999px",
    background: `linear-gradient(180deg, ${c.yellow2}, ${c.yellow})`,
    boxShadow: "0 0 0 3px rgba(251,191,36,0.16)",
    flex: "0 0 auto",
    marginTop: "0.35rem",
  }
})

const BulletText = styled.span({
  fontSize: "1.1rem",
  fontWeight: 900,
  letterSpacing: "-0.01em",
  lineHeight: 1.25,
})

const HintCard = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    marginTop: "0.35rem",
    borderRadius: "1rem",
    padding: "0.95rem 0.95rem",
    border: `1px solid ${c.divider}`,
    background: c.cardBg,
    display: "grid",
    gap: "0.35rem",
  }
})

const HintTitle = styled.div({
  fontSize: "1.05rem",
  fontWeight: 950,
  letterSpacing: "-0.01em",
})

const HintText = styled.div(() => {
  const c = notesColors(NOTES_THEME)
  return {
    fontSize: "1.02rem",
    fontWeight: 850,
    color: c.subText,
    lineHeight: 1.3,
  }
})