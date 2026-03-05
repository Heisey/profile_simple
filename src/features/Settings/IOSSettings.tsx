// components/windows/SettingsIosWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { ChevronRight, Check } from "lucide-react"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"

type Route = "root" | "about" | "appearance"
type Theme = "light" | "dark"

const SettingsIosApp: React.FC = () => {
  const [route, setRoute] = React.useState<Route>("root")
  const [theme, setTheme] = React.useState<Theme>("light")

  const title =
    route === "root" ? "Settings" : route === "about" ? "About" : "Appearance"

  return (
    <Shell>
      <TopBar>
        {route !== "root" ? (
          <BackButton onClick={() => setRoute("root")}>Back</BackButton>
        ) : (
          <BackSpacer />
        )}
        <TopTitle>{title}</TopTitle>
        <RightSpacer />
      </TopBar>

      <Scroll>
        {route === "root" && (
          <>
            <SectionTitle>PREFERENCES</SectionTitle>
            <Group>
              <RowButton onClick={() => setRoute("about")}>
                <Left>
                  <IconDot $bg="#3b82f6" />
                  <RowTitle>About</RowTitle>
                </Left>
                <Right>
                  <ChevronRight size={18} />
                </Right>
              </RowButton>

              <Divider />

              <RowButton disabled onClick={() => setRoute("appearance")}>
                <Left>
                  <IconDot $bg="#a855f7" />
                  <RowTitle>Appearance</RowTitle>
                </Left>
                <Right>
                  <RightValue>{theme === "light" ? "Light" : "Dark"}</RightValue>
                  <ChevronRight size={18} />
                </Right>
              </RowButton>
            </Group>
          </>
        )}

        {route === "about" && (
          <>
            <Group>
              <RowStatic>
                <Left>
                  <RowTitle>Product</RowTitle>
                </Left>
                <Right>
                  <RightValue>JustinOS Portfolio</RightValue>
                </Right>
              </RowStatic>
              <Divider />
              <RowStatic>
                <Left>
                  <RowTitle>Version</RowTitle>
                </Left>
                <Right>
                  <RightValue>1.0.0</RightValue>
                </Right>
              </RowStatic>
              <Divider />
              <RowStatic>
                <Left>
                  <RowTitle>Built With</RowTitle>
                </Left>
                <Right>
                  <RightValue>React · TypeScript · Styled Components · GSAP</RightValue>
                </Right>
              </RowStatic>
            </Group>

            <Foot>
              Designed & built by Justin Heisey.
            </Foot>
          </>
        )}

        {route === "appearance" && (
          <>
            <SectionTitle>APPEARANCE</SectionTitle>
            <Group>
              <RowButton onClick={() => setTheme("light")}>
                <Left>
                  <RowTitle>Light</RowTitle>
                </Left>
                <Right>
                  {theme === "light" && <Check size={18} />}
                </Right>
              </RowButton>

              <Divider />

              <RowButton onClick={() => setTheme("dark")}>
                <Left>
                  <RowTitle>Dark</RowTitle>
                </Left>
                <Right>
                  {theme === "dark" && <Check size={18} />}
                </Right>
              </RowButton>
            </Group>

            <PreviewWrap>
              <PreviewCard>
                <PreviewHeader>
                  <PreviewPill />
                  <PreviewPill />
                </PreviewHeader>
                <PreviewBody $mode={theme} />
              </PreviewCard>
            </PreviewWrap>
          </>
        )}
      </Scroll>
    </Shell>
  )
}

export const SettingsIosWindow = IOSWindowWrapper(
  SettingsIosApp,
  "settings"
)

/* ================= Layout (iOS) ================= */

const Shell = styled.div({
  height: "100%",
  display: "grid",
  gridTemplateRows: "3.25rem 1fr",
})

const TopBar = styled.div({
  display: "grid",
  gridTemplateColumns: "5rem 1fr 5rem",
  alignItems: "center",
  padding: "0 0.75rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(242,242,247,0.92)",
  backdropFilter: "blur(10px)",
})

const TopTitle = styled.div({
  textAlign: "center",
  fontWeight: 800,
  fontSize: "1.05rem",
  color: "#111827",
})

const BackButton = styled.button({
  border: 0,
  background: "transparent",
  padding: "0.35rem 0.25rem",
  borderRadius: "0.6rem",
  fontWeight: 700,
  color: "#2563eb",
  cursor: "default",
})

const BackSpacer = styled.div({})
const RightSpacer = styled.div({})

const Scroll = styled.div({
  overflow: "auto",
  padding: "0.9rem 0.9rem 1.25rem",
})

/* ================= Groups ================= */

const SectionTitle = styled.div({
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: "0.08em",
  color: "rgba(17,24,39,0.55)",
  margin: "0.35rem 0.15rem 0.5rem",
})

const Group = styled.div({
  borderRadius: "0.9rem",
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,0.08)",
  overflow: "hidden",
  boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
})

const Divider = styled.div({
  height: 1,
  background: "rgba(0,0,0,0.06)",
  marginLeft: "3.0rem", // indent like iOS (after icon)
})

/* ================= Rows ================= */

const RowBase = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  padding: "0.85rem 0.9rem",
  border: 0 as const,
  background: "transparent",
  color: "#111827",
}

const RowButton = styled.button({
  ...RowBase,
  cursor: "default",
  ":active": { background: "rgba(0,0,0,0.04)" },

  "&:disabled": {
    color: "lightgray",
    cursor: "not-allowed"
  }
})

const RowStatic = styled.div({
  ...RowBase,
})

const Left = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  minWidth: 0,
})

const Right = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
  color: "inherit",
  marginRight: "2rem"
})

const RowTitle = styled.div({
  fontWeight: 700,
  fontSize: "0.95rem",
})

const RightValue = styled.div({
  fontWeight: 600,
  fontSize: "0.9rem",
})

const IconDot = styled.div<{ $bg: string }>((p) => ({
  width: "2rem",
  height: "2rem",
  borderRadius: "0.6rem",
  background: p.$bg,
  boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
}))

/* ================= Appearance Preview ================= */

const PreviewWrap = styled.div({
  marginTop: "0.9rem",
})

const PreviewCard = styled.div({
  borderRadius: "1.1rem",
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,0.08)",
  overflow: "hidden",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
})

const PreviewHeader = styled.div({
  display: "flex",
  gap: "0.5rem",
  padding: "0.75rem",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
})

const PreviewPill = styled.div({
  width: "4.5rem",
  height: "0.7rem",
  borderRadius: "999px",
  background: "rgba(0,0,0,0.08)",
})

const PreviewBody = styled.div<{ $mode: Theme }>((p) => ({
  height: "8.5rem",
  background:
    p.$mode === "light"
      ? "linear-gradient(180deg,#ffffff,#f3f4f6)"
      : "linear-gradient(180deg,#111827,#0b1220)",
  transition: "background 200ms ease",
}))

/* ================= Misc ================= */

const Foot = styled.div({
  marginTop: "0.9rem",
  fontSize: "0.85rem",
  color: "rgba(17,24,39,0.55)",
  padding: "0 0.15rem",
})
