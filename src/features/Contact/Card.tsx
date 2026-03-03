
import * as React from 'react'
import styled from 'styled-components'
import {
  Mail,
  Copy,
  ExternalLink,
} from "lucide-react"

import { CONTACT } from 'config'
import type { Pane } from './types'

interface CardProps {
    setPane: (args: Pane) => void
}

export const Card: React.FC<CardProps> = (props) => {
    const { setPane } = props
  const [copied, setCopied] = React.useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // TODO
      // no-op (clipboard permission)
    }
  }

    return (
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
    )
}


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
