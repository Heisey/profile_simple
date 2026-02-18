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

export const mockFiles = [
  { id: "f1", name: "Resume – Tech Lead.pdf", kind: "PDF", date: "Today", icon: "📄" },
  { id: "f2", name: "Resume – Frontend.pdf", kind: "PDF", date: "Yesterday", icon: "📄" },
  { id: "f3", name: "Resume – Backend.pdf", kind: "PDF", date: "2 days ago", icon: "📄" },
  { id: "f4", name: "Builder – Case Study", kind: "Folder", date: "Last week", icon: "📁" },
  { id: "f5", name: "Nexus – Screenshots", kind: "Folder", date: "Last week", icon: "📁" },
  { id: "f6", name: "Project Roadmap.md", kind: "Markdown", date: "Last month", icon: "📝" },
  { id: "f7", name: "Contact.txt", kind: "Text", date: "Last month", icon: "📄" },
  { id: "f8", name: "Gallery", kind: "Folder", date: "Last month", icon: "📁" },
]

export const mockFolders = [
  { id: "c1", name: "Resumes", icon: "📁" },
  { id: "c2", name: "Projects", icon: "📁" },
  { id: "c3", name: "Screenshots", icon: "📁" },
  { id: "c4", name: "Notes", icon: "📁" },
]
