
export type FinderSection = "favorites" | "locations" | "tags"

export type FinderItem = {
  id: string
  label: string
  icon: React.ReactNode
  section: FinderSection
}

export type ViewMode = "icons" | "list" | "columns"