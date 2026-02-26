// components/custom/Menu.tsx
import * as React from "react"
import { useGlobalStore } from "store"
import styled from "styled-components"
import { menuItems, MENUS } from "config"
import type { FeatureWindowKey, MenuEntry } from "types"

export const Menu: React.FC = () => {
  const [openId, setOpenId] = React.useState<number | null>(null)
  const rootRef = React.useRef<HTMLDivElement | null>(null)

  // close on outside click + Esc
  React.useEffect(() => {
    if (openId === null) return

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!rootRef.current) return
      if (!rootRef.current.contains(t)) setOpenId(null)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null)
    }

    window.addEventListener("mousedown", onDown)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [openId])

  return (
    <MenuStyles ref={rootRef}>
      <img src="/images/logo.svg" alt="logo" />

      {menuItems.map((dataSet) => (
        <MenuItem
          key={dataSet.id}
          {...dataSet}
          isOpen={openId === dataSet.id}
          isAnyMenuOpen={openId !== null}
          onToggle={() =>
            setOpenId((cur) => (cur === dataSet.id ? null : dataSet.id))
          }
          onClose={() => setOpenId(null)}
          onOpenSibling={(id) => setOpenId(id)}
        />
      ))}
    </MenuStyles>
  )
}

interface MenuItemProps {
  id: number
  name: string
  isOpen: boolean
  isAnyMenuOpen: boolean
  onToggle: () => void
  onClose: () => void
  onOpenSibling: (id: number) => void
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  isOpen,
  isAnyMenuOpen,
  onToggle,
  onClose,
  onOpenSibling,
}) => {
  const openWindow = useGlobalStore(store => store.openWindow)
  const entries = React.useMemo(() => MENUS[name] ?? [], [name])

  const [hoveredLabel, setHoveredLabel] = React.useState<string | null>(null)

  const [activeSub, setActiveSub] = React.useState<string | null>(null)

  const [entered, setEntered] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen) {
      setActiveSub(null)
      setHoveredLabel(null)
      setEntered(false)
      return
    }

    setActiveSub(null)
    setEntered(false)
    const t = window.setTimeout(() => setEntered(true), 0)
    return () => window.clearTimeout(t)
  }, [isOpen, name])

  const activeEntry = React.useMemo(() => {
    return entries.find(
      (e): e is Extract<MenuEntry, { type: "item" }> =>
        e.type === "item" && e.label === activeSub
    )
  }, [entries, activeSub])

  const hasActiveSubmenu = !!activeEntry?.submenu?.length

  return (
    <MenuItemWrap
      onMouseLeave={() => {
        setHoveredLabel(null)
        setActiveSub(null)
      }}
      onMouseEnter={() => {
        if (!isOpen && isAnyMenuOpen) onOpenSibling(id)
      }}
    >
      <MenuTitle
        type="button"
        $open={isOpen}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onToggle}
      >
        {name}
      </MenuTitle>

      {isOpen && (
        <DropdownShell $entered={entered}>
          <DropdownOuter role="menu" aria-label={`${name} menu`}>
            <DropdownInner>
              {entries.map((entry, idx) => {
                if (entry.type === "separator") return <Sep key={`sep-${idx}`} />

                const disabled = !!entry.disabled
                const hasSub = !!entry.submenu?.length

                const isHovered = hoveredLabel === entry.label
                const isSubActive = hasSub && activeSub === entry.label
                const isActive = isHovered || isSubActive

                return (
                  <Row
                    key={`${entry.label}-${idx}`}
                    role="menuitem"
                    aria-disabled={disabled}
                    $disabled={disabled}
                    $active={isActive}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => {
                      setHoveredLabel(entry.label)
                      if (hasSub) setActiveSub(entry.label)
                      else setActiveSub(null)
                    }}
                    onClick={() => {
                      if (disabled) return
                      if (hasSub) {
                        setActiveSub(entry.label)
                        return
                      }

                      runEntry(entry, { openWindow, close: onClose })
                    }}
                  >
                    <Label>{entry.label}</Label>

                    <Right>
                      {entry.shortcut && <Shortcut>{entry.shortcut}</Shortcut>}
                      {hasSub && <Arrow>›</Arrow>}
                    </Right>
                  </Row>
                )
              })}
            </DropdownInner>

            {hasActiveSubmenu && (
              <SubDropdown $entered={entered}>
                <SubInner
                  onMouseEnter={() => setHoveredLabel(activeEntry!.label)}
                >
                  {activeEntry!.submenu!.map((sub, i) => {
                    if (sub.type === "separator") return <Sep key={`subsep-${i}`} />

                    const disabled = !!sub.disabled
                    const hasSub = !!sub.submenu?.length

                    return (
                      <Row
                        key={`${sub.label}-${i}`}
                        role="menuitem"
                        aria-disabled={disabled}
                        $disabled={disabled}
                        $active={hoveredLabel === sub.label}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() => setHoveredLabel(sub.label)}
                        onMouseLeave={() => setHoveredLabel(null)}
                        onClick={() => {
                          if (disabled) return
                          if (hasSub) return

                          runEntry(sub, { openWindow, close: onClose })
                        }}
                      >
                        <Label>{sub.label}</Label>
                        <Right>
                          {sub.shortcut && <Shortcut>{sub.shortcut}</Shortcut>}
                          {hasSub && <Arrow>›</Arrow>}
                        </Right>
                      </Row>
                    )
                  })}
                </SubInner>
              </SubDropdown>
            )}
          </DropdownOuter>
        </DropdownShell>
      )}
    </MenuItemWrap>
  )
}

const runEntry = (
  entry: Extract<MenuEntry, { type: "item" }>,
  opts: { openWindow: (id: FeatureWindowKey, props: any) => void; close: () => void }
) => {
  if (entry.disabled) return

  if (entry.submenu?.length) return

  if ((entry as any).featureWindow) {
    opts.openWindow((entry as any).featureWindow, {})
    opts.close()
    return
  }

  const action = entry.action
  if (!action || action.kind === "none") {
    opts.close()
    return
  }

  switch (action.kind) {
    case "url": {
      window.open(action.href, action.target ?? "_blank", "noopener,noreferrer")
      opts.close()
      return
    }
    case "window": {
      opts.openWindow("finder", action.props ?? {})
      opts.close()
      return
    }
    case "custom": {
      action.run()
      opts.close()
      return
    }
  }
}

const MenuStyles = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
})

const MenuItemWrap = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
})

const MenuTitle = styled.button<{ $open: boolean }>((p) => ({
  border: 0,
  background: p.$open ? "rgba(0,0,0,0.12)" : "transparent",
  padding: "0.22rem 0.55rem",
  borderRadius: "0.4rem",
  cursor: "default",
  fontSize: "0.875rem",
  transition: "background 120ms ease",
  ":hover": { background: "rgba(0,0,0,0.10)" },
}))

const DropdownShell = styled.div<{ $entered: boolean }>((p) => ({
  position: "absolute",
  top: "calc(100% + 0.25rem)",
  left: 0,
  zIndex: 9999,
  opacity: p.$entered ? 1 : 0,
  transform: p.$entered ? "translateY(0) scale(1)" : "translateY(6px) scale(0.985)",
  transformOrigin: "top left",
  transition: "opacity 120ms ease-out, transform 120ms ease-out",
}))

const panelBase: React.CSSProperties = {
  borderRadius: "0.625rem", // ~10px
  padding: "0.28rem",
  background: "rgba(40, 40, 40, 0.72)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  minWidth: "16rem",
}

const DropdownOuter = styled.div({
  ...panelBase,
  position: "relative",
  overflow: "visible",
})

const DropdownInner = styled.div({
  overflow: "hidden",
  borderRadius: "0.55rem",
})

const SubDropdown = styled.div<{ $entered: boolean }>((p) => ({
  ...panelBase,
  position: "absolute",
  top: 0,
  left: "calc(100% - 6px)",
  zIndex: 10000,
  overflow: "visible",
  opacity: p.$entered ? 1 : 0,
  transform: p.$entered ? "translateX(0) scale(1)" : "translateX(-4px) scale(0.99)",
  transformOrigin: "top left",
  transition: "opacity 110ms ease-out, transform 110ms ease-out",
}))

const SubInner = styled.div({
  overflow: "hidden",
  borderRadius: "0.50rem",
})

const Row = styled.div<{ $disabled: boolean; $active: boolean }>((p) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",

  padding: "0.46rem 0.70rem",
  borderRadius: "0.5rem",

  color: p.$disabled ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.92)",
  cursor: "default",
  userSelect: "none",

  background: p.$active ? "rgba(255,255,255,0.12)" : "transparent",

  ":hover": p.$disabled ? {} : { background: "rgba(255,255,255,0.12)" },
}))

const Label = styled.div({
  fontSize: "0.98rem",
  lineHeight: 1.2,
})

const Right = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  color: "rgba(255,255,255,0.55)",
})

const Shortcut = styled.div({
  fontSize: "0.95rem",
  letterSpacing: "0.02em",
})

const Arrow = styled.div({
  fontSize: "1.1rem",
  marginLeft: "0.15rem",
  opacity: 0.8,
})

const Sep = styled.div({
  height: 1,
  margin: "0.35rem 0.30rem",
  background: "rgba(255,255,255,0.14)",
})
