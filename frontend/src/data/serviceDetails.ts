export type ServiceShape = 'reel' | 'cube' | 'stack' | 'cylinder' | 'steps'

export interface ServiceDetail {
  id: string
  index: number
  title: string
  /** Short emphasised line under the title. */
  lead: string
  /** Intro paragraph under the KEY FOCUSES label. */
  focusIntro: string
  /** Bulleted focus list. */
  focuses: string[]
  /** Larger closing paragraph. */
  outro: string
  /** Projects CTA label. */
  cta: string
  shape: ServiceShape
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'ai-automation-systems',
    index: 1,
    title: 'AI Automation Systems',
    lead: 'Automation should run your business quietly in the background — not create more work.',
    focusIntro:
      'I build AI-powered automation systems that connect your tools, data and decisions into self-driving workflows.',
    focuses: [
      'Workflow & process automation',
      'Multi-channel automation',
      'LLM & AI API integration',
      'RAG & vector databases',
      'Autonomous business systems',
      'Monitoring & reliability',
    ],
    outro:
      'From lead capture to fulfilment, I design automation infrastructures that scale with your business and free your team to focus on what matters.',
    cta: 'Automation Projects',
    shape: 'reel',
  },
  {
    id: 'multi-agent-ai',
    index: 2,
    title: 'Multi-Agent AI & Agents',
    lead: 'Intelligent agents that plan, reason and act — coordinated like a real team.',
    focusIntro:
      'I architect multi-agent systems and AI chatbots that handle complex, multi-step tasks autonomously and safely.',
    focuses: [
      'Multi-agent orchestration',
      'Autonomous AI agents',
      'AI chatbots & assistants',
      'LangChain & tool calling',
      'Knowledge bases & RAG',
      'Human-in-the-loop controls',
    ],
    outro:
      'Each agent system is engineered for reliability and transparency — so it makes the right call, every time, at enterprise scale.',
    cta: 'AI Agent Projects',
    shape: 'cube',
  },
  {
    id: 'erp-crm-development',
    index: 3,
    title: 'ERP & CRM Development',
    lead: 'Your operations deserve software shaped around how you actually work.',
    focusIntro:
      'I build custom ERP and CRM platforms that unify inventory, finance, HR, sales and analytics in one system.',
    focuses: [
      'Custom ERP architecture',
      'CRM & sales pipelines',
      'Role-based access control',
      'Real-time dashboards',
      'Workflow automation',
      'Scalable data models',
    ],
    outro:
      'I replace spreadsheets and disconnected tools with a single, scalable platform your whole team can rely on.',
    cta: 'ERP / CRM Projects',
    shape: 'stack',
  },
  {
    id: 'mobile-app-development',
    index: 4,
    title: 'Mobile App Development',
    lead: 'One codebase, two app stores, a native-quality experience on every device.',
    focusIntro:
      'I build cross-platform and native mobile apps for Android and iOS that feel fast, fluid and premium.',
    focuses: [
      'React Native development',
      'Android & iOS apps',
      'Offline sync & push',
      'Payments & integrations',
      'App performance tuning',
      'Store release & support',
    ],
    outro:
      'From concept to the App Store, I deliver mobile products that users love and businesses can grow on.',
    cta: 'Mobile Projects',
    shape: 'cylinder',
  },
  {
    id: 'full-stack-saas',
    index: 5,
    title: 'Full-Stack Web & SaaS',
    lead: 'Production-grade web apps and SaaS products, engineered to scale.',
    focusIntro:
      'I develop end-to-end web platforms and SaaS products on React, Next.js, FastAPI and Node — built for speed and growth.',
    focuses: [
      'React & Next.js front-ends',
      'FastAPI / Node back-ends',
      'Multi-tenant SaaS & billing',
      'REST & GraphQL APIs',
      'Cloud, Docker & CI/CD',
      'Security & performance',
    ],
    outro:
      'Every build is fast, accessible, secure and ready for scale — with clean architecture that stays easy to maintain.',
    cta: 'Web & SaaS Projects',
    shape: 'steps',
  },
]

export const PROCESS = [
  'Understanding your business & goals',
  'Architecting the right AI & systems',
  'Building scalable, secure software',
  'Automating, launching & supporting it',
]
