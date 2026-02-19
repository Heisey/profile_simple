import type { DockApp, ResumeDoc } from "types";

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
    {
        id: "finder",
        name: "Finder",
        icon: "/apple/Finder.png",
        canOpen: true,
    },
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
  { id: "fe", title: "Resume – Frontend", file: "/files/resume.pdf" },
  { id: "be", title: "Resume – Backend", file: "/files/resume.pdf" },
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
  category: string
  items: string[]
}



export const techStack: TechStackGroup[] = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
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