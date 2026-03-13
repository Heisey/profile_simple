
export type ResumeDoc = {
  id: string
  title: string
  file: string // public URL (ex: "/pdf/resume-frontend.pdf")
}

export type ProjectIds =
      "builder"
    | "nexus"

export type Project = {
    id: ProjectIds
    name: string
    subtitle: string
    icon: string 
    difficulty: 1 | 2 | 3 | 4 | 5
    cover: string 
    screenshots: string[] 
    overview: string
    highlights: string[]
    whatIDid: string[]
    techStack: string[]
    links: {
        github?: string
        live?: string
        caseStudy?: string
    }
}


export type Social = {
  label: string
  url: string
  icon:
    | "github"
    | "linkedin"
    | "website"
    | "youtube"
    | "x"
}
