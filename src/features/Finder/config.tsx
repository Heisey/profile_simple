import {
  Clock,
  FileText,
  FolderKanban,
} from "lucide-react"
import type { FinderItem } from "./types"

export const sidebarItems: FinderItem[] = [
  // Favorites (your picks)
  { id: "recents", label: "Recents", icon: <Clock size={16} />, section: "favorites" },
  { id: "resumes", label: "Resumes", icon: <FileText size={16} />, section: "favorites" },
  { id: "projects", label: "Projects", icon: <FolderKanban size={16} />, section: "favorites" },

  // Locations (safe defaults for a portfolio “filesystem”)
  { id: "portfolio", label: "Portfolio", icon: <span style={{ fontSize: 16 }}>🖥️</span>, section: "locations" },
  { id: "downloads", label: "Downloads", icon: <span style={{ fontSize: 16 }}>⬇️</span>, section: "locations" },
  { id: "docs", label: "Documents", icon: <span style={{ fontSize: 16 }}>📄</span>, section: "locations" },

  // Tags (nice looking, low commitment)
  { id: "tag-featured", label: "Featured", icon: <span style={{ fontSize: 16 }}>⭐</span>, section: "tags" },
  { id: "tag-ai", label: "AI", icon: <span style={{ fontSize: 16 }}>🤖</span>, section: "tags" },
  { id: "tag-web", label: "Web", icon: <span style={{ fontSize: 16 }}>🌐</span>, section: "tags" },
]

