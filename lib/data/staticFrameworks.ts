export interface FrameworkSnippet {
  title: string;
  language: string;
  code: string;
}

export interface SetupStep {
  step: number;
  explanation: string;
  command?: string;
}

export interface StaticFramework {
  id: string;
  name: string;
  slug: string;
  category: "frontend" | "backend" | "fullstack" | "mobile" | "css" | "testing" | "devops";
  logo: string;
  color: string;
  description: string;
  longDescription?: string;
  level: ("junior" | "mid" | "senior")[];
  tags: string[];
  language: string;
  stars: number;
  weeklyDownloads: number;
  releaseYear?: number;
  performance: number;
  learningCurve: number;
  ecosystem: number;
  jobMarket: number;
  pros?: string[];
  cons?: string[];
  useCases?: string[];
  officialDocs?: string;
  githubUrl?: string;
  setupSteps?: SetupStep[];
  codeSnippets?: FrameworkSnippet[];
}

export const STATIC_FRAMEWORKS: StaticFramework[] = [
  {
    id: "1",
    name: "React",
    slug: "react",
    category: "frontend",
    logo: "",
    color: "#61dafb",
    language: "JavaScript",
    description: "A JavaScript library for building user interfaces with component-based architecture.",
    longDescription: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'.",
    level: ["junior", "mid", "senior"],
    tags: ["components", "jsx", "virtual-dom", "hooks"],
    stars: 220000,
    weeklyDownloads: 25000000,
    releaseYear: 2013,
    performance: 85,
    learningCurve: 60,
    ecosystem: 98,
    jobMarket: 98,
    pros: ["Huge ecosystem", "Strong community", "Component reusability"],
    cons: ["JSX learning curve", "Rapid changes"],
    useCases: ["Single Page Applications", "Progressive Web Apps", "Complex Dashboards"],
    officialDocs: "https://react.dev",
    githubUrl: "https://github.com/facebook/react",
    setupSteps: [
      { step: 1, explanation: "Create a new React app", command: "npm create vite@latest my-app -- --template react" },
      { step: 2, explanation: "Install dependencies", command: "cd my-app && npm install" },
      { step: 3, explanation: "Start DEV server", command: "npm run dev" },
    ],
    codeSnippets: [
      { title: "Functional Component", language: "jsx", code: "function Greeting() {\n  return <h1>Hello, World!</h1>;\n}" }
    ]
  },
  {
    id: "4",
    name: "Next.js",
    slug: "nextjs",
    category: "fullstack",
    logo: "",
    color: "#ffffff",
    language: "JavaScript/TypeScript",
    description: "The React framework for production — hybrid SSR and SSG, file-based routing.",
    longDescription: "Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.",
    level: ["mid", "senior"],
    tags: ["ssr", "ssg", "api-routes", "server-components"],
    stars: 125000,
    weeklyDownloads: 8000000,
    releaseYear: 2016,
    performance: 95,
    learningCurve: 65,
    ecosystem: 94,
    jobMarket: 95,
    pros: ["Excellent SEO", "Great performance", "Rich feature set"],
    cons: ["Opinionated structure", "Learning curve for Server Components"],
    useCases: ["E-commerce", "Blogs", "Corporate Websites", "SaaS Platforms"],
    officialDocs: "https://nextjs.org/docs",
    githubUrl: "https://github.com/vercel/next.js",
    setupSteps: [
      { step: 1, explanation: "Create a Next.js app", command: "npx create-next-app@latest" },
      { step: 2, explanation: "Run development server", command: "npm run dev" },
    ],
    codeSnippets: [
      { title: "App Router Page", language: "tsx", code: "export default function Page() {\n  return <h1>Hello from Next.js App Router!</h1>;\n}" }
    ]
  },
  {
    id: "2",
    name: "Vue",
    slug: "vue",
    category: "frontend",
    logo: "",
    color: "#42b883",
    language: "JavaScript",
    description: "The progressive JavaScript framework for building modern web interfaces.",
    longDescription: "Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.",
    level: ["junior", "mid"],
    tags: ["reactive", "components", "sfc", "composition-api"],
    stars: 208000,
    weeklyDownloads: 5000000,
    releaseYear: 2014,
    performance: 88,
    learningCurve: 45,
    ecosystem: 85,
    jobMarket: 82,
    pros: ["Gentle learning curve", "Versatile", "Excellent documentation"],
    cons: ["Avoids global standards in some areas", "Smaller ecosystem than React"],
    useCases: ["SPAs", "Interactive Dashboards", "Prototype-to-Production"],
    officialDocs: "https://vuejs.org",
    githubUrl: "https://github.com/vuejs/core",
    setupSteps: [
      { step: 1, explanation: "Scaffold a Vue project", command: "npm create vue@latest" },
      { step: 2, explanation: "Install and run", command: "npm install && npm run dev" },
    ],
    codeSnippets: [
      { title: "Composition API", language: "html", code: "<script setup>\nimport { ref } from 'vue'\nconst count = ref(0)\n</script>\n<template>\n  <button @click='count++'>{{ count }}</button>\n</template>" }
    ]
  },
  {
    id: "8",
    name: "FastAPI",
    slug: "fastapi",
    category: "backend",
    logo: "",
    color: "#009688",
    language: "Python",
    description: "Modern, fast web framework for building APIs with Python 3.8+ based on standard Python type hints.",
    longDescription: "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.",
    level: ["junior", "mid", "senior"],
    tags: ["python", "async", "openapi", "pydantic"],
    stars: 75000,
    weeklyDownloads: 2000000,
    releaseYear: 2018,
    performance: 98,
    learningCurve: 40,
    ecosystem: 80,
    jobMarket: 78,
    pros: ["Extremely fast", "Automatic API docs", "Type safety"],
    cons: ["Relatively new", "Python 3.6+ only"],
    useCases: ["Microservices", "Machine Learning APIs", "High-performance backends"],
    officialDocs: "https://fastapi.tiangolo.com",
    githubUrl: "https://github.com/tiangolo/fastapi",
    setupSteps: [
      { step: 1, explanation: "Install FastAPI and Uvicorn", command: "pip install fastapi uvicorn" },
      { step: 2, explanation: "Create a simple app", command: "echo \"from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef read_root():\n    return {'Hello': 'World'}\" > main.py" },
      { step: 3, explanation: "Run the server", command: "uvicorn main:app --reload" },
    ],
    codeSnippets: [
      { title: "Basic Endpoint", language: "python", code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/\")\nasync def root():\n    return {\"status\": \"online\"}" }
    ]
  },
  // Add other frameworks... (truncated for brevity in this step, but I will fulfill the 20)
  { id: "3", name: "Angular", slug: "angular", category: "frontend", logo: "", color: "#dd0031", description: "Platform for building mobile and desktop web applications using TypeScript.", level: ["mid", "senior"], tags: ["typescript", "di", "rxjs"], language: "TypeScript", stars: 95000, weeklyDownloads: 3500000, performance: 80, learningCurve: 75, ecosystem: 90, jobMarket: 88 },
  { id: "5", name: "Svelte", slug: "svelte", category: "frontend", logo: "", color: "#ff3e00", description: "Cybernetically enhanced web apps with no virtual DOM overhead.", level: ["junior", "mid"], tags: ["compiler", "reactive", "lightweight"], language: "JavaScript", stars: 79000, weeklyDownloads: 1000000, performance: 97, learningCurve: 40, ecosystem: 65, jobMarket: 55 },
  { id: "6", name: "Nuxt", slug: "nuxt", category: "fullstack", logo: "", color: "#00dc82", description: "The intuitive Vue framework — SSR, SSG, file-based routing and auto-imports.", level: ["mid"], tags: ["vue", "ssr", "ssg"], language: "JavaScript", stars: 55000, weeklyDownloads: 1200000, performance: 90, learningCurve: 55, ecosystem: 78, jobMarket: 70 },
  { id: "7", name: "Express", slug: "express", category: "backend", logo: "", color: "#68a063", description: "Fast, unopinionated, minimalist web framework for Node.js.", level: ["junior", "mid"], tags: ["nodejs", "rest", "middleware"], language: "JavaScript", stars: 64000, weeklyDownloads: 32000000, performance: 82, learningCurve: 35, ecosystem: 95, jobMarket: 90 },
  { id: "9", name: "Django", slug: "django", category: "backend", logo: "", color: "#2ba977", description: "The web framework for perfectionists with deadlines — batteries included Python framework.", level: ["junior", "mid", "senior"], tags: ["python", "orm", "admin"], language: "Python", stars: 79000, weeklyDownloads: 1500000, performance: 75, learningCurve: 50, ecosystem: 88, jobMarket: 85 },
  { id: "10", name: "NestJS", slug: "nestjs", category: "backend", logo: "", color: "#e0234e", description: "A progressive Node.js framework for building efficient and scalable server-side applications.", level: ["mid", "senior"], tags: ["typescript", "decorators", "di"], language: "TypeScript", stars: 67000, weeklyDownloads: 2200000, performance: 88, learningCurve: 70, ecosystem: 82, jobMarket: 82 },
  { id: "11", name: "Laravel", slug: "laravel", category: "backend", logo: "", color: "#ff2d20", description: "The PHP Framework for Web Artisans — elegant syntax with powerful features.", level: ["junior", "mid", "senior"], tags: ["php", "orm", "artisan"], language: "PHP", stars: 78000, weeklyDownloads: 500000, performance: 70, learningCurve: 45, ecosystem: 90, jobMarket: 80 },
  { id: "12", name: "React Native", slug: "react-native", category: "mobile", logo: "", color: "#61dafb", description: "Build native apps for Android and iOS using React.", level: ["mid", "senior"], tags: ["mobile", "native", "cross-platform"], language: "JavaScript", stars: 118000, weeklyDownloads: 1800000, performance: 80, learningCurve: 65, ecosystem: 85, jobMarket: 88 },
  { id: "13", name: "Flutter", slug: "flutter", category: "mobile", logo: "", color: "#54c5f8", description: "Google's UI toolkit for building natively compiled applications from a single codebase.", level: ["junior", "mid", "senior"], tags: ["dart", "cross-platform", "widgets"], language: "Dart", stars: 165000, weeklyDownloads: 800000, performance: 95, learningCurve: 60, ecosystem: 80, jobMarket: 82 },
  { id: "14", name: "Tailwind CSS", slug: "tailwind", category: "css", logo: "", color: "#38bdf8", description: "A utility-first CSS framework for rapidly building custom user interfaces.", level: ["junior", "mid", "senior"], tags: ["utility-first", "responsive", "customizable"], language: "CSS", stars: 83000, weeklyDownloads: 10000000, performance: 90, learningCurve: 40, ecosystem: 92, jobMarket: 90 },
  { id: "15", name: "Astro", slug: "astro", category: "fullstack", logo: "", color: "#ff5d01", description: "The all-in-one web framework designed for speed — ships zero JavaScript by default.", level: ["mid", "senior"], tags: ["islands", "static", "performance"], language: "JavaScript", stars: 45000, weeklyDownloads: 800000, performance: 99, learningCurve: 50, ecosystem: 65, jobMarket: 55 },
  { id: "16", name: "Remix", slug: "remix", category: "fullstack", logo: "", color: "#e8f2ff", description: "Full stack web framework focused on web fundamentals and modern UX.", level: ["mid", "senior"], tags: ["react", "loaders", "actions"], language: "JavaScript", stars: 30000, weeklyDownloads: 600000, performance: 92, learningCurve: 60, ecosystem: 70, jobMarket: 65 },
  { id: "17", name: "Fastify", slug: "fastify", category: "backend", logo: "", color: "#00b0d7", description: "Fast and low overhead web framework for Node.js — 2x faster than Express.", level: ["mid", "senior"], tags: ["nodejs", "performance", "schema"], language: "JavaScript", stars: 32000, weeklyDownloads: 3000000, performance: 98, learningCurve: 50, ecosystem: 75, jobMarket: 65 },
  { id: "18", name: "Spring Boot", slug: "spring-boot", category: "backend", logo: "", color: "#6db33f", description: "Opinionated convention-over-configuration Java framework for production-ready apps.", level: ["mid", "senior"], tags: ["java", "enterprise", "microservices"], language: "Java", stars: 74000, weeklyDownloads: 1000000, performance: 85, learningCurve: 70, ecosystem: 95, jobMarket: 92 },
  { id: "19", name: "Gin", slug: "gin", category: "backend", logo: "", color: "#00acd7", description: "The fastest full-featured web framework for Go — up to 40x faster than Martini.", level: ["mid", "senior"], tags: ["go", "performance", "rest"], language: "Go", stars: 77000, weeklyDownloads: 400000, performance: 99, learningCurve: 55, ecosystem: 72, jobMarket: 70 },
  { id: "20", name: "Jest", slug: "jest", category: "testing", logo: "", color: "#c21325", description: "Delightful JavaScript Testing Framework with a focus on simplicity.", level: ["junior", "mid", "senior"], tags: ["testing", "mocking", "coverage"], language: "JavaScript", stars: 44000, weeklyDownloads: 24000000, performance: 85, learningCurve: 40, ecosystem: 95, jobMarket: 90 },
];
