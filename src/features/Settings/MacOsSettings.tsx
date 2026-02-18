// components/windows/SettingsWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { WindowWrapper } from "components/hoc/WindowWrapper"
import { Info, Palette, Check } from "lucide-react"

type Tab = "about" | "theme"

const SettingsApp: React.FC = () => {
  const [tab, setTab] = React.useState<Tab>("about")
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  return (
    <Shell>
      <Sidebar>
        <SidebarTitle>Settings</SidebarTitle>

        <Nav>
          <NavItem
            $active={tab === "about"}
            onClick={() => setTab("about")}
          >
            <Info size={16} />
            About
          </NavItem>

          <NavItem
            $active={tab === "theme"}
            onClick={() => setTab("theme")}
          >
            <Palette size={16} />
            Appearance
          </NavItem>
        </Nav>
      </Sidebar>

      <Main>
        {tab === "about" && (
          <Content>
            <PageTitle>About This Portfolio</PageTitle>

            <Card>
              <CardRow>
                <Label>Product Name</Label>
                <Value>JustinOS Portfolio</Value>
              </CardRow>

              <CardRow>
                <Label>Version</Label>
                <Value>1.0.0</Value>
              </CardRow>

              <CardRow>
                <Label>Built With</Label>
                <Value>React · TypeScript · Styled Components · GSAP</Value>
              </CardRow>

              <CardRow>
                <Label>Purpose</Label>
                <Value>
                  A macOS-inspired interactive portfolio showcasing projects,
                  architecture, and UI systems.
                </Value>
              </CardRow>
            </Card>

            <Footnote>
              Designed & built by Justin Heisey.
            </Footnote>
          </Content>
        )}

        {tab === "theme" && (
          <Content>
            <PageTitle>Appearance</PageTitle>

            <Card>
              <CardSectionTitle>Theme</CardSectionTitle>

              <Segmented>
                <SegmentButton
                  $active={theme === "light"}
                  onClick={() => setTheme("light")}
                >
                  Light
                  {theme === "light" && <Check size={14} />}
                </SegmentButton>

                <SegmentButton
                  $active={theme === "dark"}
                  onClick={() => setTheme("dark")}
                >
                  Dark
                  {theme === "dark" && <Check size={14} />}
                </SegmentButton>
              </Segmented>

              <ThemePreview>
                <PreviewBox $mode={theme} />
              </ThemePreview>
            </Card>
          </Content>
        )}
      </Main>
    </Shell>
  )
}

export const SettingsMacOsWindow = WindowWrapper(
  SettingsApp,
  "settings",
  "Settings"
)

/* ================= Layout ================= */

const Shell = styled.div({
  display: "grid",
  gridTemplateColumns: "15rem 1fr",
  height: "40rem",
})

const Sidebar = styled.aside({
  background: "#f9fafb",
  borderRight: "1px solid rgba(0,0,0,0.08)",
  padding: "1rem",
})

const SidebarTitle = styled.div({
  fontWeight: 900,
  fontSize: "1rem",
  marginBottom: "1rem",
  color: "#111827",
})

const Nav = styled.div({
  display: "grid",
  gap: "0.4rem",
})

const NavItem = styled.button<{ $active: boolean }>((p) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.55rem 0.75rem",
  borderRadius: "0.75rem",
  border: 0,
  background: p.$active
    ? "rgba(59,130,246,0.14)"
    : "transparent",
  fontWeight: 600,
  fontSize: "0.9rem",
  cursor: "default",
  color: "#111827",
  transition: "background 120ms ease",

  ":hover": {
    background: p.$active
      ? "rgba(59,130,246,0.14)"
      : "rgba(0,0,0,0.05)",
  },
}))

/* ================= Main ================= */

const Main = styled.main({
  background: "#ffffff",
  overflow: "auto",
})

const Content = styled.div({
  padding: "2rem",
  maxWidth: "44rem",
})

const PageTitle = styled.div({
  fontSize: "1.75rem",
  fontWeight: 900,
  marginBottom: "1.5rem",
  color: "#111827",
})

/* ================= Cards ================= */

const Card = styled.div({
  borderRadius: "1.2rem",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#ffffff",
  boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
  padding: "1.25rem",
})

const CardRow = styled.div({
  display: "grid",
  gridTemplateColumns: "10rem 1fr",
  padding: "0.65rem 0",
  borderTop: "1px solid rgba(0,0,0,0.06)",

  ":first-child": {
    borderTop: "none",
  },
})

const Label = styled.div({
  fontWeight: 600,
  color: "#6b7280",
  fontSize: "0.9rem",
})

const Value = styled.div({
  color: "#111827",
  fontSize: "0.9rem",
  lineHeight: 1.4,
})

const Footnote = styled.div({
  marginTop: "1.5rem",
  fontSize: "0.85rem",
  color: "#6b7280",
})

/* ================= Theme ================= */

const CardSectionTitle = styled.div({
  fontWeight: 800,
  fontSize: "1rem",
  marginBottom: "0.8rem",
  color: "#111827",
})

const Segmented = styled.div({
  display: "inline-flex",
  borderRadius: "0.9rem",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(0,0,0,0.04)",
  padding: "0.25rem",
  gap: "0.25rem",
})

const SegmentButton = styled.button<{ $active: boolean }>((p) => ({
  border: 0,
  padding: "0.45rem 0.9rem",
  borderRadius: "0.75rem",
  fontWeight: 700,
  fontSize: "0.85rem",
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  background: p.$active ? "#ffffff" : "transparent",
  boxShadow: p.$active ? "0 6px 16px rgba(0,0,0,0.15)" : "none",
  cursor: "default",
  color: "#111827",
}))

const ThemePreview = styled.div({
  marginTop: "1.5rem",
})

const PreviewBox = styled.div<{ $mode: "light" | "dark" }>((p) => ({
  width: "100%",
  height: "8rem",
  borderRadius: "1rem",
  border: "1px solid rgba(0,0,0,0.08)",
  background:
    p.$mode === "light"
      ? "linear-gradient(180deg,#ffffff,#f3f4f6)"
      : "linear-gradient(180deg,#1f2937,#111827)",
  transition: "background 200ms ease",
}))
