import type { DockApp, ResumeDoc } from "types";

export const dockApps: DockApp[] = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "/images/finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "/images/safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "/images/photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "/images/contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "/images/terminal.png",
        canOpen: true,
    },
    // {
    //     id: "trash",
    //     name: "Archive", // was "Trash"
    //     icon: "/images/trash.png",
    //     canOpen: false,
    // },
]

export const tempDockApps = {
    pdfReader: {
        id: "pdfReader",
        name: "Resume",
        icon: "/images/pdfReader.png",
        canOpen: true
    }
}

export const resumes: ResumeDoc[] = [
  { id: "fe", title: "Resume – Frontend", file: "/files/resume.pdf" },
  { id: "be", title: "Resume – Backend", file: "/files/resume.pdf" },
//   { id: "lead", title: "Resume – Tech Lead", file: "/pdf/resume-lead.pdf" },
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


export const techStack = [
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