import type { FeatureWindowKey } from "./windows"

export type MenuEntry =
  | {
      type: "item"
      label: string
      shortcut?: string
      disabled?: boolean
      featureWindow?: FeatureWindowKey
      submenu?: MenuEntry[]
    }
  | { type: "separator" }