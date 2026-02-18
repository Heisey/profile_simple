// components/windows/SkillsStocksIosWindow.tsx
import * as React from "react"
import styled from "styled-components"
import { Search, MoreHorizontal } from "lucide-react"
import { IOSWindowWrapper } from "components/hoc/IOSWindowWrapper/IOSWindowWrapper"
import { techStack, type TechStackGroup } from "config"

type StocksTheme = "light" | "dark"

const STOCKS_THEME: StocksTheme = "light" // <-- switch this later from your global theme

const stocksColors = (mode: StocksTheme) => {
  const light = {
    bg: "#ffffff",
    text: "#111827",
    subText: "rgba(17,24,39,0.55)",
    rowDivider: "rgba(0,0,0,0.08)",
    rowActive: "rgba(0,0,0,0.04)",
    pillBg: "rgba(0,0,0,0.06)",
    pillBorder: "rgba(0,0,0,0.08)",
    pillText: "rgba(17,24,39,0.8)",
    dotBg: "rgba(0,0,0,0.06)",
    green: "rgba(34,197,94,1)",
    greenPill: "rgba(34,197,94,0.95)",
    greenTextOnPill: "#0b0b0b",
  }

  const dark = {
    bg: "#000000",
    text: "#ffffff",
    subText: "rgba(255,255,255,0.55)",
    rowDivider: "rgba(255,255,255,0.10)",
    rowActive: "rgba(255,255,255,0.04)",
    pillBg: "rgba(255,255,255,0.12)",
    pillBorder: "rgba(255,255,255,0.12)",
    pillText: "rgba(255,255,255,0.9)",
    dotBg: "rgba(0,0,0,0.25)",
    green: "rgba(34,197,94,1)",
    greenPill: "rgba(34,197,94,0.95)",
    greenTextOnPill: "#0b0b0b",
  }

  return mode === "light" ? light : dark
}

/* ---------------- skill scoring ----------------
   Strength: 0..100 (big number)
   Momentum: +0.10..+2.50 (pill)
*/
const CATEGORY_WEIGHT: Record<string, number> = {
  Frontend: 1.15,
  Backend: 1.12,
  Mobile: 1.05,
  Database: 1.0,
  "Dev Tools": 0.98,
  Styling: 0.95,
}

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

const hash01 = (s: string): number => {
  // deterministic 0..1
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  // unsigned to 0..1
  return (h >>> 0) / 0xffffffff
}

const strengthScore = (g: TechStackGroup): number => {
  const w = CATEGORY_WEIGHT[g.category] ?? 1
  // base from count (3 items ~ low/mid, 8+ ~ strong)
  const base = 42 + g.items.length * 7.25
  const polish = (hash01(g.category) - 0.5) * 6 // -3..+3
  return +clamp((base + polish) * w, 28, 99.99).toFixed(2)
}

const momentum = (g: TechStackGroup): number => {
  // +0.10..+2.50 stable per category
  const x = hash01(g.category + "|mom")
  return +(0.1 + x * 2.4).toFixed(2)
}

const ticker = (category: string): string =>
  category
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 4)
    .toUpperCase()
    .padEnd(3, "X")

/* ---------------- sparkline (green) ---------------- */
const sparkValues = (key: string, points = 34): number[] => {
  // deterministic, slightly upward-trending line
  let r = hash01(key + "|spark")
  const out: number[] = []
  let v = 0.35 + r * 0.25 // 0.35..0.60 start
  for (let i = 0; i < points; i++) {
    // gentle noise + upward bias
    r = hash01(key + "|" + i + "|n")
    const noise = (r - 0.5) * 0.10 // -0.05..+0.05
    const drift = 0.0075 // upward
    v = clamp(v + noise + drift, 0.12, 0.92)
    out.push(v)
  }
  return out
}
const Sparkline: React.FC<{ values: number[] }> = ({ values }) => {
  const w = 120
  const h = 40
  const pad = 4

  const c = stocksColors(STOCKS_THEME)

  if (!values.length) return null

  // scale points
  const xs = values.map(
    (_, i) => pad + (i * (w - pad * 2)) / (values.length - 1)
  )
  const ys = values.map(
    (v) => pad + (1 - v) * (h - pad * 2)
  )

  // ----- Smooth curve using quadratic bezier -----
  const smoothPath = () => {
    if (xs.length < 2) return ""

    let d = `M ${xs[0]} ${ys[0]}`

    for (let i = 1; i < xs.length - 1; i++) {
      const cx = (xs[i] + xs[i + 1]) / 2
      const cy = (ys[i] + ys[i + 1]) / 2
      d += ` Q ${xs[i]} ${ys[i]} ${cx} ${cy}`
    }

    // last segment
    d += ` T ${xs[xs.length - 1]} ${ys[ys.length - 1]}`

    return d
  }

  const linePath = smoothPath()

  // area fill path
  const areaPath =
    linePath +
    ` L ${xs[xs.length - 1]} ${h - pad}` +
    ` L ${xs[0]} ${h - pad} Z`

  const gradientId = `spark-grad-${Math.random().toString(36).slice(2)}`

  return (
    <SparkWrap aria-hidden>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.green} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c.green} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Filled area under line */}
        <path
          d={areaPath}
          fill={`url(#${gradientId})`}
          stroke="none"
        />

        {/* Smooth line */}
        <path
          d={linePath}
          fill="none"
          stroke={c.green}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SparkWrap>
  )
}

/* ---------------- app ---------------- */

const StocksIosApp: React.FC = () => {
  const dateLabel = React.useMemo(() => {
    // e.g. "February 18"
    return new Intl.DateTimeFormat(undefined, {
      month: "long",
      day: "numeric",
    }).format(new Date())
  }, [])

  return (
    <Shell>
      <Header>
        <HeaderLeft>
          <Title>Stocks</Title>
          <SubTitle>{dateLabel}</SubTitle>
        </HeaderLeft>

        <HeaderRight>
          <SearchPill>
            <Search size={18} />
            <DotBtn aria-label="More">
              <MoreHorizontal size={18} />
            </DotBtn>
          </SearchPill>
        </HeaderRight>
      </Header>

      <List>
        {techStack.map((g) => {
          const sym = ticker(g.category)
          const score = strengthScore(g)
          const chg = momentum(g)
          const spark = sparkValues(g.category)
          return (
            <Row key={g.category} type="button">
              <Left>
                <Symbol>{sym}</Symbol>
                <Company>{g.category}</Company>
              </Left>

              <Mid>
                <Sparkline values={spark} />
              </Mid>

              <Right>
                <Price>{score.toFixed(2)}</Price>
                <Change>+{chg.toFixed(2)}</Change>
              </Right>
            </Row>
          )
        })}
      </List>
    </Shell>
  )
}

export const StocksIosWindow = IOSWindowWrapper(
  StocksIosApp,
  "stocks"
)

/* ---------------- styles (match screenshot) ---------------- */

const Shell = styled.div(() => {
  const c = stocksColors(STOCKS_THEME)
  return {
    width: "100%",
    height: "100%",
    minHeight: 0,
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
  const c = stocksColors(STOCKS_THEME)
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
  const c = stocksColors(STOCKS_THEME)
  return {
    height: "2.6rem",
    borderRadius: "999px",
    background: c.pillBg,
    border: `1px solid ${c.pillBorder}`,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0 0.8rem",
    color: c.pillText,
  }
})


const DotBtn = styled.div(() => {
  const c = stocksColors(STOCKS_THEME)
  return {
    width: "2.05rem",
    height: "2.05rem",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    background: c.dotBg,
  }
})


const List = styled.div({
  minHeight: 0,              // important
  width: "100%",
  padding: "0.25rem 0",
  overflow: "auto",          // so it fills and scrolls like the real Stocks list
})


const Row = styled.button(() => {
  const c = stocksColors(STOCKS_THEME)
  return {
    width: "100%",
    border: 0,
    background: "transparent",
    padding: "0.95rem 1.1rem",
    display: "grid",
    gridTemplateColumns: "1fr 8.2rem auto",
    alignItems: "center",
    gap: "0.9rem",
    cursor: "default",
    borderTop: `1px solid ${c.rowDivider}`,
    ":first-child": { borderTop: "none" },
    ":active": { background: c.rowActive },
  }
})

const Left = styled.div({
  minWidth: 0,
  display: "grid",
  gap: "0.25rem",
})

const Symbol = styled.div({
  fontSize: "1.55rem",
  fontWeight: 900,
  letterSpacing: "-0.01em",
  lineHeight: 1,
})

const Company = styled.div(() => {
  const c = stocksColors(STOCKS_THEME)
  return {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: c.subText,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }
})

const Mid = styled.div({
  width: "8.2rem",
  height: "2.2rem",
  display: "grid",
  alignItems: "center",
})

const SparkWrap = styled.div({
  width: "100%",
  height: "100%",
})

const Right = styled.div({
  display: "grid",
  justifyItems: "end",
  gap: "0.35rem",
})

const Price = styled.div({
  fontSize: "1.85rem",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  lineHeight: 1,
})

const Change = styled.div(() => {
  const c = stocksColors(STOCKS_THEME)
  return {
    fontSize: "1.05rem",
    fontWeight: 900,
    padding: "0.35rem 0.8rem",
    borderRadius: "0.6rem",
    background: c.greenPill,
    color: c.greenTextOnPill,
    lineHeight: 1.1,
  }
})
