import type { IconType } from 'react-icons'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFramer,
  SiPython,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiSocketdotio,
  SiOpenai,
  SiAndroid,
  SiApple,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiSupabase,
  SiDocker,
  SiLinux,
  SiNginx,
  SiGithubactions,
  SiCloudflare,
} from 'react-icons/si'
import {
  LuSparkles,
  LuBot,
  LuWorkflow,
  LuNetwork,
  LuDatabase,
  LuServer,
  LuShield,
  LuLock,
  LuCpu,
  LuSmartphone,
  LuGitBranch,
  LuCloud,
  LuLink,
  LuZap,
} from 'react-icons/lu'
import { cn } from '@/lib/utils'

/**
 * Skill label → icon. Brand logos come from Simple Icons (react-icons/si),
 * shipped in the bundle (no external CDN). Non-brand concepts use Lucide.
 */
const ICONS: Record<string, IconType> = {
  // Frontend
  React: SiReact,
  'Next.js': SiNextdotjs,
  'React Native': SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  HTML5: SiHtml5,
  CSS3: SiCss,
  // Backend
  Python: SiPython,
  FastAPI: SiFastapi,
  Django: SiDjango,
  Flask: SiFlask,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  GraphQL: SiGraphql,
  'REST APIs': LuNetwork,
  WebSockets: SiSocketdotio,
  // AI & automation
  'Multi-Agent Systems': LuBot,
  'AI Agents': LuBot,
  'AI Automation': LuSparkles,
  'AI Chatbots': LuBot,
  LangChain: LuLink,
  'RAG Systems': LuDatabase,
  'LLM Integration': SiOpenai,
  'Vector Databases': LuDatabase,
  'Workflow Automation': LuWorkflow,
  'Multi-Channel Automation': LuNetwork,
  'Autonomous Systems': LuCpu,
  'AI APIs': SiOpenai,
  // Mobile
  'Android Apps': SiAndroid,
  'iOS Apps': SiApple,
  'Cross-Platform Apps': LuSmartphone,
  'App Optimization': LuZap,
  // Databases
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  SQLite: SiSqlite,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  // Cloud & DevOps
  Docker: SiDocker,
  AWS: LuCloud,
  Linux: SiLinux,
  Nginx: SiNginx,
  'CI/CD': LuGitBranch,
  'GitHub Actions': SiGithubactions,
  Cloudflare: SiCloudflare,
  'VPS Hosting': LuServer,
  // Security
  'API Security': LuShield,
  'Secure Authentication': LuLock,
  'Server Security': LuShield,
  'Network Architecture': LuNetwork,
  'Cybersecurity Fundamentals': LuShield,
}

export function TechIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = ICONS[name] ?? LuSparkles
  return (
    <Icon
      aria-hidden
      className={cn('h-[15px] w-[15px] shrink-0 text-fg/70', className)}
    />
  )
}
