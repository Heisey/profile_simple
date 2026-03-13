import type { DockApp, Project, ResumeDoc, Social } from "types";

export const iosGridApps: DockApp[] = [
  {
    id: "files",
    name: "Projects",
    icon: "/apple/FolderIcon.png",
    canOpen: true
  },
  {
    id: "books",
    name: "Resume",
    icon: "/apple/Books.png",
    canOpen: true
  },
  {
    id: "notes",
    name: "Skills",
    icon: "/apple/Notes.png",
    canOpen: true
  }
]

export const iosDockApps: DockApp[] = [
    {
        id: "contact",
        name: "Contacts",
        icon: "/apple/Contacts.png",
        canOpen: true
    },
    {
        id: "safari",
        name: "Articles",
        icon: "/apple/Safari.png",
        canOpen: true
    },
    {
        id: "appStore",
        name: "App Store",
        icon: "/apple/AppStore.png",
        canOpen: true
    },
    {
        id: "settings",
        name: "Settings",
        icon: "/apple/SystemPreferences.png",
        canOpen: true
    },
]

export const macOsDockApps: DockApp[] = [
    // {
    //     id: "finder",
    //     name: "Finder",
    //     icon: "/apple/Finder.png",
    //     canOpen: true,
    // },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "/apple/Safari.png",
        canOpen: true,
    },
    {
        id: "appStore",
        name: "App Store", // was "Photos"
        icon: "/apple/AppStore.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "/apple/Contacts.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "/apple/Terminal.png",
        canOpen: true,
    },
    {
        id: "settings",
        name: "Settings", // was "Terminal"
        icon: "/apple/SystemPreferences.png",
        canOpen: true,
    }
]

export const tempDockApps = {
    pdfReader: {
        id: "pdfReader",
        name: "Resume",
        icon: "/apple/Preview.png",
        canOpen: true
    }
}

export const resumes: ResumeDoc[] = [
  { id: "simple", title: "Simple", file: "/files/resume.pdf" },
]

export const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

export type TechStackGroup = {
  id: number
  category: string
  items: string[]
  lastUpdated: Date
}



export const techStack: TechStackGroup[] = [
  {
    id: 1,
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
    lastUpdated: new Date()
  },
  {
    id: 2,
    category: "Mobile",
    items: ["React Native", "Expo"],
    lastUpdated: new Date()
  },
  {
    id: 3,
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
    lastUpdated: new Date()
  },
  {
    id: 4,
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Hono"],
    lastUpdated: new Date()
  },
  {
    id: 5,
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
    lastUpdated: new Date()
  },
  {
    id: 6,
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
    lastUpdated: new Date()
  },
];


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

export const PROJECTS: Project[] = [
    {
        id: "builder",
        name: "Visual Builder",
        subtitle: "Drag-and-drop pages with SSR routing",
        icon: "/images/finder.png",
        difficulty: 5,
        cover: "/images/hero-placeholder.jpg",
        screenshots: ["/images/hero-placeholder.jpg", "/images/hero-placeholder.jpg"],
        overview:
            "A macOS-style visual builder that stores page documents, renders server-side for SEO, and supports structured components with constraints.",
        highlights: [
            "SSR-friendly page generation with publish/draft flows",
            "Component catalog + inspector editing model",
            "Designed for plugin-style extensions",
        ],
        whatIDid: [
            "Architected the monorepo + routing patterns",
            "Built the document schema and rendering pipeline",
            "Implemented UI patterns for selection + inspector editing",
        ],
        techStack: ["TypeScript", "React", "Vite", "Nx", "Node.js", "Express", "MySQL"],
        links: { github: "https://github.com/", live: "https://example.com" },
    },
    {
        id: "nexus",
        name: "EatNow",
        subtitle: "A food ordering app",
        icon: "/images/safari.png",
        difficulty: 2,
        cover: "/images/hero-placeholder.jpg",
        screenshots: ["/images/hero-placeholder.jpg"],
        overview:
            "enter content",
        highlights: [
          "enter content",
          "enter content"
        ],
        whatIDid: [
          "enter content",
          "enter content"
        ],
        techStack: ["TypeScript", "React", "Vite", "Styled Components"],
        links: { github: "https://github.com/Heisey/eatnow" },
    },
]


export const CONTACT = {
  name: "Justin Heisey",
  subtitle: "Software Engineer • Builder / Platform",
  location: "Canada",
  email: "you@example.com",
  note: "Fastest way to reach me: email.",
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/", icon: "github" },
    { label: "Website", url: "https://example.com", icon: "website" },
    { label: "YouTube", url: "https://youtube.com", icon: "youtube" },
    { label: "X", url: "https://x.com", icon: "x" },
  ] as Social[],
}