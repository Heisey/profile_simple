import type { MenuEntry } from "types/nav";

export const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

export const MENUS: Record<string, MenuEntry[]> = {
  Projects: [
    { type: "item", label: "View All Projects", shortcut: "⌘ P" },
    {
      type: "item",
      label: "Featured",
      submenu: [
        { type: "item", label: "Builder" },
        { type: "item", label: "Nexus", },
        { type: "separator" },
        { type: "item", label: "Open GitHub", shortcut: "⌘ G" },
      ],
    },
  ],
  Resume: [
    { type: "item", label: "View Resume", shortcut: "⌘ R", featureWindow: "pdfReader" },
    { type: "item", label: "Download PDF", shortcut: "⇧ ⌘ R", featureWindow: "pdfReader" },
  ],
}

export const menuItems: { id: number; name: string }[] = [
  { id: 1, name: "Projects" },
  { id: 2, name: "Resume" },
]