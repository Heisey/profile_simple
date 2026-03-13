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
    { type: "item", label: "View All Projects", action: { kind: "window", windowId: "" } },
    {
      type: "item",
      label: "Featured",
      submenu: [
        { type: "item", label: "Builder", action: { kind: "window", windowId: "appStore", props: { project: "builder" }  } },
        { type: "item", label: "Nexus", action: { kind: "window", windowId: "appStore", props: { project: "nexus" } } },
        { type: "separator" },
        { type: "item", label: "Open GitHub", shortcut: "⌘ G", action: { kind: "url", href: "https://github.com/yourname", target: "_blank" } },
      ],
    },
  ],
  Resume: [
    // {
    //   type: "item",
    //   label: "High Fidelity",
    //   shortcut: "⌘ R",
    //   action: { kind: "window", windowId: "pdfReader", props: { mode: "view" } },
    // },
    {
      type: "item",
      label: "Simple",
      shortcut: "⇧ ⌘ R",
      action: { kind: "window", windowId: "pdfReader", props: { resume: "simple" } },
    },
  ],
}

export const menuItems: { id: number; name: string }[] = [
  { id: 1, name: "Projects" },
  { id: 2, name: "Resume" },
]