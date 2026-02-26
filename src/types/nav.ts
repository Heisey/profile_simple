import type { FeatureWindowKey } from "./windows"

export type MenuAction =
  | { kind: "none" }
  | { kind: "url"; href: string; target?: "_blank" | "_self" }
  | { kind: "window"; windowId: string; props?: Record<string, unknown> }
  | { kind: "custom"; run: () => void }

export type MenuEntry =
  | {
      type: "item"
      label: string
      shortcut?: string
      disabled?: boolean
      featureWindow?: FeatureWindowKey
      submenu?: MenuEntry[]
      action?: MenuAction
    }
  | { type: "separator" }