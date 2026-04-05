import type { DockApp, Project, ResumeDoc, Social } from "types";

export const iosGridApps: DockApp[] = [
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
    date: "April 5, 2026",
    title:
      "React State Seperation: How to stop you app from turning into a dumpster fire",
    image: "/articles/react-state-separation.png",
    link: "https://medium.com/@jheisler01/react-state-separation-adf7e1289cea",
  }
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
    category: "Languages",
    items: ["Typescript", "C++", "Python"],
    lastUpdated: new Date()
  },
  {
    id: 2,
    category: "Frontend",
    items: ["React", "Next", "TypeScript"],
    lastUpdated: new Date()
  },
  {
    id: 3,
    category: "Mobile",
    items: ["React Native"],
    lastUpdated: new Date()
  },
  {
    id: 4,
    category: "Styling",
    items: ["MUI", "Styled Components", "Tailwind CSS", "Sass", "CSS"],
    lastUpdated: new Date()
  },
  {
    id: 5,
    category: "Backend",
    items: ["Express", "NestJS", "Flask"],
    lastUpdated: new Date()
  },
  {
    id: 6,
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySql"],
    lastUpdated: new Date()
  },
  {
    id: 7,
    category: "Infrastructure",
    items: ["Docker", "RabbitMQ", "Kafka", "Nginx"],
    lastUpdated: new Date()
  },
  {
    id: 7,
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
    subtitle: "SSR-first drag-and-drop page builder with file-based rendering and microservice architecture",
    icon: "/apps/visual-builder/icon.png",
    difficulty: 5,
    cover: "/apps/visual-builder/cover.png",
    screenshots: [],

    overview:
      "A full-stack visual page builder designed around server-side rendering, file-based routing, and a scalable microservice architecture. Pages are constructed using structured components, persisted as documents, and compiled into real files for SSR delivery and SEO performance.",

    highlights: [
      "File-based page generation instead of database-only rendering",
      "SSR-first architecture with no per-request rebuilds",
      "Component-driven editor with selection + inspector pattern",
      "Publish/draft workflow with document versioning in mind",
      "Monorepo architecture with isolated services and shared contracts",
      "Designed for plugin-style extensibility"
    ],

    whatIDid: [
      "Architected a full Nx monorepo with multiple services and shared libraries",
      "Designed a document-based page schema and rendering pipeline",
      "Implemented file generation strategy for SSR-compatible pages",
      "Built a visual editor with component selection and inspector editing",
      "Created routing patterns aligned with file-based page output",
      "Defined boundaries between presentation components and server logic",
      "Set up a scalable Node/Express service layer for builder operations"
    ],

    techStack: [
      "TypeScript",
      "React",
      "Vite",
      "Nx",
      "Node.js",
      "Express",
      "MySQL",
      "Docker"
    ],

    links: {
      github: "https://github.com/",
      live: "https://example.com"
    }
  },
  {
    id: "storyTemplate",
    name: "AI Story Builder",
    subtitle: "AI-generated 3D avatars with interactive storytelling in a browser-based world",
    icon: "/apps/story-template/icon.png",
    difficulty: 5,
    
    cover: "/apps/story-template/cover.png",
    screenshots: [],

    overview:
      "An experimental platform that generates 3D avatars from user-uploaded photos and places them into interactive environments for storytelling. Built using Blender for model generation, a Python/Flask backend for processing, and a React + Three.js frontend for real-time rendering and interaction.",

    highlights: [
      "Photo-to-3D avatar generation pipeline using Blender and Python",
      "Interactive 3D environments rendered in the browser with Three.js",
      "Designed for kid-friendly storytelling and creative exploration",
      "Containerized architecture using Docker for reproducible processing",
      "Separation of ML processing, rendering, and frontend interaction layers",
      "Early exploration of AI-assisted content creation workflows"
    ],

    whatIDid: [
      "Designed the end-to-end pipeline from image upload to 3D model generation",
      "Integrated Blender scripting with Python to automate avatar creation",
      "Built a Flask-based backend for processing and managing generation jobs",
      "Developed a React + Three.js frontend for rendering and interacting with 3D scenes",
      "Containerized the system using Docker to manage Blender and ML dependencies",
      "Explored UX patterns for making 3D storytelling accessible to non-technical users (kids)"
    ],

    techStack: [
      "Python",
      "Flask",
      "Blender",
      "Docker",
      "React",
      "Three.js",
      "TypeScript"
    ],

    links: {
      github: "https://github.com/Heisey/story-template",
      live: "https://example.com"
    }
  },
  {
    id: "eatnow",
    name: "EatNow",
    subtitle: "Full-stack food ordering platform built with the MERN stack",
    icon: "/apps/eat-now/icon.png",
    difficulty: 4,
    cover: "/apps/eat-now/cover.png",
    screenshots: [],

    overview:
      "A full-stack food ordering application that allows users to browse menus, place orders, and manage their cart in real time. Built with the MERN stack, the project focuses on clean state management, API design, and a scalable foundation for e-commerce-style workflows.",

    highlights: [
      "End-to-end ordering flow from browsing to checkout",
      "RESTful API design with Node.js and Express",
      "Dynamic menu rendering and cart management with React",
      "MongoDB schema design for products, orders, and users",
      "Separation of frontend, backend, and data layers",
      "Foundation for real-time or multi-vendor expansion"
    ],

    whatIDid: [
      "Built a full-stack MERN application with React frontend and Express backend",
      "Designed MongoDB schemas for users, menu items, and orders",
      "Implemented cart logic and order flow from UI to backend processing",
      "Created REST APIs for product retrieval, user actions, and order handling",
      "Managed application state and UI updates for a responsive user experience",
      "Structured the project for scalability and future feature expansion"
    ],

    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "JavaScript",
      "REST API"
    ],

    links: {
      github: "https://github.com/Heisey/eatnow",
      live: "https://example.com"
    }
  }
]


export const CONTACT = {
  name: "Justin Heisey",
  subtitle: "Software Engineer",
  location: "Canada",
  email: "jheisler01@gmail.com",
  note: "Fastest way to reach me: email.",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/justin-heisler-35069a87/", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/Heisey", icon: "github" }
  ] as Social[],
}