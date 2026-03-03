
import * as React from 'react'
import styled from 'styled-components'
import {
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Youtube,
  Twitter,
} from "lucide-react"

import { CONTACT } from 'config'
import type { Social } from "types"

export const Socials: React.FC = () => {

    return (
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
    )
}

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
