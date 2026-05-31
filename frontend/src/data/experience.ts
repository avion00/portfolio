export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  /** Short summary line. */
  summary: string
  /** Highlight bullets. */
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'autostacks',
    role: 'Founder & CEO',
    company: 'AutoStacks',
    period: '2024 — Present',
    summary:
      'Founded AutoStacks to build enterprise-grade AI systems, automation infrastructures and intelligent business ecosystems.',
    highlights: [
      'AI Automation Systems',
      'Multi-Agent AI Systems',
      'AI Chatbots & Agents',
      'ERP / CRM Development',
      'Enterprise Software',
      'Mobile Apps & SaaS Platforms',
      'Cloud Systems',
      'Automation Infrastructure',
    ],
  },
  {
    id: 'buy2rent',
    role: 'Full Stack Developer',
    company: 'Buy2Rent.eu',
    period: '2 Years',
    summary:
      'Built and scaled core platform features end to end — from backend APIs to polished frontend systems.',
    highlights: [
      'Full Stack Development',
      'Backend APIs',
      'Frontend Systems',
      'Scalable Platforms',
      'Architecture Design',
    ],
  },
  {
    id: 'atlas-technology',
    role: 'Software Engineer',
    company: 'Atlas Technology',
    period: '2.5 Years',
    summary:
      'Engineered web platforms and automation systems, integrating AI and optimising performance at scale.',
    highlights: [
      'Software Engineering',
      'Automation Systems',
      'Web Platforms',
      'AI Integrations',
      'System Optimization',
    ],
  },
  {
    id: 'fiverr-freelance',
    role: 'Freelance Developer',
    company: 'Fiverr',
    period: '3.5 Years',
    summary:
      'Delivered software for international clients — SaaS, AI automation, mobile apps and custom enterprise solutions.',
    highlights: [
      'International Clients',
      'SaaS Development',
      'AI Automation',
      'Mobile Applications',
      'Enterprise Solutions',
      'Custom Software Systems',
    ],
  },
]
