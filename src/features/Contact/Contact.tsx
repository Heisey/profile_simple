// components/windows/ContactWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import {
  Search,
  Mail,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Youtube,
  Twitter,
} from "lucide-react"

type Pane = "card" | "socials"

type Social = {
  label: string
  url: string
  icon:
    | "github"
    | "linkedin"
    | "website"
    | "youtube"
    | "x"
}

const CONTACT = {
  name: "Justin Heisey",
  subtitle: "Software Engineer • Builder / Platform",
  location: "Canada",
  email: "you@example.com",
  note: "Fastest way to reach me: email.",
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/", icon: "github" },
    { label: "Website", url: "https://example.com", icon: "website" },
    { label: "YouTube", url: "https://youtube.com", icon: "youtube" },
    { label: "X", url: "https://x.com", icon: "x" },
  ] as Social[],
}

const ContactApp: React.FC = () => {
  const [pane, setPane] = React.useState<Pane>("card")
  const [query, setQuery] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const items = React.useMemo(() => {
    const base = [
      { id: "me", label: CONTACT.name, kind: "person" as const },
      { id: "socials", label: "Socials", kind: "folder" as const },
    ]
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter((x) => x.label.toLowerCase().includes(q))
  }, [query])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // no-op (clipboard permission)
    }
  }

  return (
    <Shell>
      <Sidebar>
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
      </Sidebar>

      <Main>
        <Toolbar>
          <ToolbarLeft>
            <Seg>
              <SegBtn
                type="button"
                $active={pane === "card"}
                onClick={() => setPane("card")}
                aria-label="Card view"
              >
                Card
              </SegBtn>
              <SegBtn
                type="button"
                $active={pane === "socials"}
                onClick={() => setPane("socials")}
                aria-label="Socials view"
              >
                Socials
              </SegBtn>
            </Seg>
          </ToolbarLeft>

          <ToolbarRight>
            <IconBtn type="button" title="Search (placeholder)" aria-label="Search">
              <Search size={16} />
            </IconBtn>
          </ToolbarRight>
        </Toolbar>

        <Body>
          {pane === "card" ? (
            <CardView>
              <Hero>
                <Avatar />
                <HeroMeta>
                  <HeroName>{CONTACT.name}</HeroName>
                  <HeroSub>{CONTACT.subtitle}</HeroSub>
                  <HeroPills>
                    <Pill>{CONTACT.location}</Pill>
                    <Pill>Open to opportunities</Pill>
                  </HeroPills>

                  <HeroActions>
                    <PrimaryBtn
                      as="a"
                      href={`mailto:${CONTACT.email}`}
                      title="Email"
                    >
                      <Mail size={16} />
                      Email
                    </PrimaryBtn>

                    <Btn type="button" onClick={copyEmail} title="Copy email">
                      <Copy size={16} />
                      {copied ? "Copied" : "Copy"}
                    </Btn>
                  </HeroActions>
                </HeroMeta>
              </Hero>

              <InfoCard>
                <InfoTitle>Contact</InfoTitle>

                <InfoRow>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>
                    <Mono>{CONTACT.email}</Mono>
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>{CONTACT.location}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Socials</InfoLabel>
                  <InfoValue>
                    <InlineLink
                      type="button"
                      onClick={() => setPane("socials")}
                    >
                      View profiles <ExternalLink size={14} />
                    </InlineLink>
                  </InfoValue>
                </InfoRow>
              </InfoCard>

              <Note>{CONTACT.note}</Note>
            </CardView>
          ) : (
            <SocialsView>
              <SocialsTop>
                <SocialsTitle>Socials</SocialsTitle>
                <SocialsHint>{CONTACT.socials.length} links</SocialsHint>
              </SocialsTop>

              <SocialGrid>
                {CONTACT.socials.map((s) => (
                  <SocialCard key={s.label}>
                    <SocialIconWrap aria-hidden="true">
                      {renderSocialIcon(s.icon)}
                    </SocialIconWrap>

                    <SocialMeta>
                      <SocialName>{s.label}</SocialName>
                      <SocialUrl title={s.url}>{stripUrl(s.url)}</SocialUrl>
                    </SocialMeta>

                    <SocialAction
                      as="a"
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      title={`Open ${s.label}`}
                    >
                      <ExternalLink size={16} />
                      Open
                    </SocialAction>
                  </SocialCard>
                ))}
              </SocialGrid>
            </SocialsView>
          )}
        </Body>
      </Main>
    </Shell>
  )
}

export const ContactWindow = WindowWrapper(ContactApp, "contact", "Contacts")

/* ---------------- helpers ---------------- */

function stripUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

function renderSocialIcon(kind: Social["icon"]) {
  switch (kind) {
    case "github":
      return <Github size={18} />
    case "linkedin":
      return <Linkedin size={18} />
    case "youtube":
      return <Youtube size={18} />
    case "x":
      return <Twitter size={18} />
    case "website":
    default:
      return <Globe size={18} />
  }
}

/* ---------------- styles ---------------- */

const Shell = styled.div({
  display: "grid",
  gridTemplateColumns: "17rem 1fr",
  height: "44rem",
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

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff",
})

const Toolbar = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.55rem 0.75rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.92)",
})

const ToolbarLeft = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const ToolbarRight = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

const Seg = styled.div({
  display: "inline-flex",
  borderRadius: "0.9rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(0,0,0,0.03)",
  padding: "0.18rem",
})

const SegBtn = styled.button<{ $active: boolean }>((p) => ({
  border: 0,
  padding: "0.35rem 0.7rem",
  borderRadius: "0.75rem",
  cursor: "default",
  background: p.$active ? "#fff" : "transparent",
  boxShadow: p.$active ? "0 8px 18px rgba(0,0,0,0.10)" : "none",
  color: "#111827",
  fontWeight: 900,
  fontSize: "0.85rem",
}))

const IconBtn = styled.button({
  width: "2rem",
  height: "2rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.70)",
  display: "grid",
  placeItems: "center",
  cursor: "default",
  color: "#111827",
})

const Body = styled.div({
  flex: 1,
  overflow: "auto",
  background: "linear-gradient(180deg, rgba(249,250,251,1), rgba(255,255,255,1))",
})

const CardView = styled.div({
  padding: "1rem",
  display: "grid",
  gap: "1rem",
})

const Hero = styled.div({
  display: "grid",
  gridTemplateColumns: "6rem 1fr",
  gap: "1rem",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "1.25rem",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
})

const Avatar = styled.div({
  width: "6rem",
  height: "6rem",
  borderRadius: "1.6rem",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02))",
  border: "1px solid rgba(0,0,0,0.10)",
})

const HeroMeta = styled.div({
  display: "grid",
  gap: "0.35rem",
})

const HeroName = styled.div({
  fontSize: "1.6rem",
  fontWeight: 950,
  color: "#111827",
  lineHeight: 1.1,
})

const HeroSub = styled.div({
  color: "#6b7280",
  fontSize: "0.95rem",
})

const HeroPills = styled.div({
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  marginTop: "0.25rem",
})

const Pill = styled.div({
  fontSize: "0.85rem",
  color: "#111827",
  borderRadius: "999px",
  padding: "0.25rem 0.55rem",
  border: "1px solid rgba(0,0,0,0.10)",
  background: "rgba(0,0,0,0.03)",
})

const HeroActions = styled.div({
  display: "flex",
  gap: "0.55rem",
  flexWrap: "wrap",
  marginTop: "0.65rem",
})

const Btn = styled.button({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.45rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.85)",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.9rem",
  cursor: "default",
  color: "#111827",
})

const PrimaryBtn = styled(Btn)({
  background: "#2563eb",
  border: "1px solid rgba(37,99,235,0.35)",
  color: "#fff",
})

const InfoCard = styled.div({
  borderRadius: "1.2rem",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
  padding: "0.9rem",
})

const InfoTitle = styled.div({
  fontWeight: 950,
  color: "#111827",
  marginBottom: "0.6rem",
})

const InfoRow = styled.div({
  display: "grid",
  gridTemplateColumns: "7rem 1fr",
  gap: "0.8rem",
  padding: "0.55rem 0.4rem",
  borderTop: "1px solid rgba(0,0,0,0.06)",
})

const InfoLabel = styled.div({
  color: "#6b7280",
  fontSize: "0.85rem",
  fontWeight: 900,
})

const InfoValue = styled.div({
  color: "#111827",
  fontSize: "0.92rem",
})

const InlineLink = styled.button({
  border: 0,
  background: "transparent",
  color: "#2563eb",
  cursor: "default",
  fontWeight: 900,
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: 0,
})

const Mono = styled.span({
  fontFamily: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
})

const Note = styled.div({
  color: "#6b7280",
  fontSize: "0.92rem",
  padding: "0 0.15rem",
})

/* -------- Socials -------- */

const SocialsView = styled.div({
  padding: "1rem",
})

const SocialsTop = styled.div({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  marginBottom: "0.75rem",
})

const SocialsTitle = styled.div({
  fontSize: "1.25rem",
  fontWeight: 950,
  color: "#111827",
})

const SocialsHint = styled.div({
  color: "#6b7280",
  fontSize: "0.9rem",
})

const SocialGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
  gap: "0.85rem",
})

const SocialCard = styled.div({
  borderRadius: "1.15rem",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
  padding: "0.9rem",
  display: "grid",
  gridTemplateColumns: "3.1rem 1fr auto",
  gap: "0.75rem",
  alignItems: "center",
})

const SocialIconWrap = styled.div({
  width: "3.1rem",
  height: "3.1rem",
  borderRadius: "0.95rem",
  border: "1px solid rgba(0,0,0,0.10)",
  background: "rgba(0,0,0,0.04)",
  display: "grid",
  placeItems: "center",
  color: "#111827",
})

const SocialMeta = styled.div({})

const SocialName = styled.div({
  fontWeight: 950,
  color: "#111827",
})

const SocialUrl = styled.div({
  marginTop: "0.15rem",
  color: "#6b7280",
  fontSize: "0.9rem",
  maxWidth: "22ch",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
})

const SocialAction = styled.a({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.45rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.85)",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.9rem",
  cursor: "default",
  color: "#111827",
  textDecoration: "none",
})
