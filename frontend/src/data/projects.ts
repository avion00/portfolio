export interface Project {
  id: string;
  index: number;
  title: string;
  category: string;
  /** Broad industry used by the Works filter. */
  industry: string;
  framework: string;
  client: string;
  year: string;
  description: string;
  /** Placeholder mockup image (swap for a real screenshot later). */
  image: string;
  /** Optional live + source links. */
  link?: string;
  repo?: string;
  /** Accent gradient used in the mockup placeholder + hover background. */
  tint: [string, string];
}

/** Clickable filters shown above the Works grid. */
export const WORK_FILTERS = [
  "All",
  "AI Automation",
  "ERP / CRM",
  "SaaS",
  "Mobile Apps",
  "Enterprise",
] as const;

/**
 * Featured projects. Images point at placeholder SVGs in /public/projects
 * so they can be swapped for real screenshots without code changes.
 */
export const projects: Project[] = [
  {
    id: "multi-agent-ai-platform",
    index: 1,
    title: "Multi-Agent AI Platform",
    category: "AI Automation",
    industry: "AI Automation",
    framework: "Python",
    client: "AutoStacks",
    year: "2025",
    description:
      "An orchestration platform where autonomous AI agents plan, delegate and execute business workflows end to end — built on LangChain, RAG and vector databases.",
    image: "/projects/project-01.png",
    link: "https://autostacks.com",
    tint: ["#414244", "#2D2E2E"],
  },
  {
    id: "enterprise-erp-system",
    index: 2,
    title: "Enterprise ERP System",
    category: "ERP Software",
    industry: "ERP / CRM",
    framework: "React",
    client: "Atlas Technology",
    year: "2024",
    description:
      "A modular ERP covering inventory, finance, HR and operations with role-based access, real-time dashboards and a scalable API backend.",
    tint: ["#FDFDFD", "#FDFDFD"],
    image: "/projects/project-02.jpeg",
  },
  {
    id: "crm-sales-platform",
    index: 3,
    title: "CRM & Sales Platform",
    category: "CRM Software",
    industry: "ERP / CRM",
    framework: "Next.js",
    client: "Buy2Rent.eu",
    year: "2023",
    description:
      "A pipeline-driven CRM with lead scoring, automation workflows and analytics — engineered for high-volume international sales teams.",
    image: "/projects/project-03.jpg",
    tint: ["#fff", "#fff"],
  },
  {
    id: "ai-support-chatbot",
    index: 4,
    title: "AI Customer Support Chatbot",
    category: "AI Chatbot",
    industry: "AI Automation",
    framework: "Python",
    client: "International Client",
    year: "2024",
    description:
      "A retrieval-augmented support assistant connected to company knowledge bases, ticketing and multi-channel messaging with human handoff.",
    image: "/projects/project-04.png",
    tint: ["#060C17", "#060C17"],
  },
  {
    id: "cross-platform-mobile-app",
    index: 5,
    title: "Cross-Platform Mobile App",
    category: "Mobile App",
    industry: "Mobile Apps",
    framework: "React Native",
    client: "Fiverr Client",
    year: "2025",
    description:
      "A production React Native app for Android & iOS with offline sync, push notifications, payments and a polished, native-feeling UI.",
    image: "/projects/project-05.png",
    tint: ["#fff", "#fff"],
  },
  {
    id: "saas-analytics-dashboard",
    index: 6,
    title: "SaaS Analytics Dashboard",
    category: "SaaS Product",
    industry: "SaaS",
    framework: "Next.js",
    client: "AutoStacks",
    year: "2025",
    description:
      "A multi-tenant SaaS with subscription billing, granular permissions and live analytics — built for scale on a modern cloud stack.",
    image: "/projects/project-06.png",
    link: "https://autostacks.com",
    tint: ["#FEFEFE", "#FEFEFE"],
  },
  {
    id: "ecommerce-platform",
    index: 7,
    title: "E-commerce Platform",
    category: "E-commerce",
    industry: "Enterprise",
    framework: "React",
    client: "International Client",
    year: "2023",
    description:
      "A high-conversion storefront with custom checkout, inventory automation and headless CMS — optimised for performance and SEO.",
    image: "/projects/project-07.png",
    tint: ["#fff", "#fff"],
  },
  {
    id: "autonomous-ai-agent-system",
    index: 8,
    title: "Autonomous AI Agent System",
    category: "AI Agents",
    industry: "AI Automation",
    framework: "Python",
    client: "AutoStacks",
    year: "2025",
    description:
      "Self-directed agents that monitor events, make decisions and trigger actions across tools — the automation core behind AutoStacks products.",
    image: "/projects/project-08.png",
    tint: ["#FBFBFC", "#fff"],
  },
  {
    id: "workflow-automation-pipeline",
    index: 9,
    title: "Workflow Automation Pipeline",
    category: "Automation",
    industry: "AI Automation",
    framework: "Python",
    client: "International Client",
    year: "2024",
    description:
      "A multi-channel automation pipeline wiring CRMs, email, messaging and internal APIs into reliable, observable business workflows.",
    image: "/projects/project-09.png",
    tint: ["#FEFEFE", "#FEFEFE"],
  },
  {
    id: "d-and-c-constructing",
    index: 10,
    title: "D&C Constructing",
    category: "Website",
    industry: "Website",
    framework: "React",
    client: "AutoStacks",
    year: "2026",
    description:
      "D&C Contracting is run by Dylan and Connor, two hands-on craftsmen serving homeowners across Western New York. We bring you services that include painting, drywall patching, window replacement, tiling, door replacement, electrical, landscaping, flooring and so much more.",
    image: "/projects/project-10.png",
    link: "https://dandccontracting.vercel.app/",
    tint: ["#090909", "#090909"],
  },
];

export const FRAMEWORKS = [
  "REACT",
  "NEXT.JS",
  "PYTHON",
  "REACT NATIVE",
] as const;
