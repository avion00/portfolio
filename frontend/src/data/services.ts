export interface Service {
  id: string
  title: string
  description: string
  /** Short monospace tag shown on the card. */
  tag: string
}

export const services: Service[] = [
  {
    id: 'ai-automation-systems',
    title: 'AI Automation Systems',
    tag: 'AI / AUTOMATION',
    description:
      'Autonomous, AI-powered workflows that run your operations — connecting tools, data and decisions into self-driving systems.',
  },
  {
    id: 'ai-agents-chatbots',
    title: 'AI Agents & Chatbots',
    tag: 'AI AGENTS',
    description:
      'RAG-powered assistants and autonomous agents that handle support, sales and internal tasks across every channel.',
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent AI Systems',
    tag: 'MULTI-AGENT',
    description:
      'Coordinated agent infrastructures that plan, delegate and execute complex business processes end to end.',
  },
  {
    id: 'erp-crm-software',
    title: 'ERP & CRM Software',
    tag: 'ENTERPRISE',
    description:
      'Custom ERP and CRM platforms — inventory, finance, HR, pipelines and analytics — tailored to how your business runs.',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    tag: 'ANDROID / iOS',
    description:
      'Cross-platform React Native and native Android/iOS apps with offline sync, payments and a polished, native feel.',
  },
  {
    id: 'full-stack-web',
    title: 'Full-Stack Web Development',
    tag: 'WEB / SAAS',
    description:
      'End-to-end web apps and SaaS products on React, Next.js, FastAPI and Node — fast, scalable and beautifully built.',
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud & DevOps',
    tag: 'CLOUD / DEVOPS',
    description:
      'Dockerised deployments, CI/CD, VPS and cloud architecture engineered for uptime, security and scale.',
  },
  {
    id: 'api-integrations',
    title: 'API & AI Integrations',
    tag: 'INTEGRATIONS',
    description:
      'Robust REST/GraphQL APIs and LLM, payment and third-party integrations that connect your stack seamlessly.',
  },
]
