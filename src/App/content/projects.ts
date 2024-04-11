
import * as Core from '../../core'

export const projects: Core.I.Project[] = [
  {
    name: 'home',
    title: 'Welcome',
    desc: '',
    paragraphs: [
      'My name is Justin, I am a front end developer based in Calgary, Alberta, Canada. I have developed different type of prouducts from infographics to ecommerce platforms.',
      'I am passionate about bold, innovative, pixel perfect beautiful interfaces and intuitively implemented UX.'
    ]
  },
  {
    name: 'componentLib',
    title: 'Component Library',
    desc: 'Personnel Component Library for developing personnel projects',
    paragraphs: [
      `I've meticulously crafted a React component library utilizing Vite and TypeScript, designed to streamline personal project development. This library acts as a centralized repository for reusable components, enabling efficient knowledge transfer and enhancing productivity across individual endeavors. By leveraging a consistent set of components, developers can expedite project creation while ensuring coherence and reliability in their codebase.`,
      `In addition to its core components, the library features a robust theme system and a suite of utilities and hooks, enhancing its versatility and usability. The theme system facilitates seamless customization to align with project aesthetics and requirements, while the utilities and hooks layer provides essential tools to accelerate development tasks and maintain code quality. `
    ],
    repo: 'https://github.com/Heisey/react-lib',
    site: 'https://www.npmjs.com/package/@heisey/componentlib'
  },
  {
    name: 'natours',
    title: 'Natours',
    desc: 'React Typescript Nature Tours Webapp',
    paragraphs: [
      `I'm diving into the ambitious task of recreating the Natours website using React, TypeScript, and Styled-components. Every aspect of this project, from the intricately designed components to the meticulously crafted API, is custom-built to stretch my abilities and expertise.`,
      `
      As I work on developing the API, I'm using this project as a testing ground to experiment with different technologies within a production-ready application. Additionally, I'm planning to expand the project by building an admin interface for the frontend, which will further enhance its capabilities and usability. This endeavor not only showcases my proficiency in web development but also reflects my commitment to delivering a comprehensive and polished user experience.`
    ],
    repo: 'https://github.com/Heisey/natours'
  }
]