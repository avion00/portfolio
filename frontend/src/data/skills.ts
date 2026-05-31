export interface SkillGroup {
  id: string
  title: string
  tag: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    tag: 'UI / CLIENT',
    skills: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'HTML5',
      'CSS3',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    tag: 'SERVER / API',
    skills: [
      'Python',
      'FastAPI',
      'Django',
      'Flask',
      'Node.js',
      'Express.js',
      'REST APIs',
      'GraphQL',
      'WebSockets',
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    tag: 'INTELLIGENCE',
    skills: [
      'Multi-Agent Systems',
      'AI Agents',
      'AI Automation',
      'AI Chatbots',
      'LangChain',
      'RAG Systems',
      'LLM Integration',
      'Vector Databases',
      'Workflow Automation',
      'Multi-Channel Automation',
      'Autonomous Systems',
      'AI APIs',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    tag: 'ANDROID / iOS',
    skills: [
      'React Native',
      'Android Apps',
      'iOS Apps',
      'Cross-Platform Apps',
      'App Optimization',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    tag: 'DATA',
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'SQLite',
      'Firebase',
      'Supabase',
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    tag: 'INFRASTRUCTURE',
    skills: [
      'Docker',
      'AWS',
      'Linux',
      'Nginx',
      'CI/CD',
      'GitHub Actions',
      'Cloudflare',
      'VPS Hosting',
    ],
  },
  {
    id: 'security',
    title: 'Security & Networking',
    tag: 'SECURITY',
    skills: [
      'API Security',
      'Secure Authentication',
      'Server Security',
      'Network Architecture',
      'Cybersecurity Fundamentals',
    ],
  },
]
