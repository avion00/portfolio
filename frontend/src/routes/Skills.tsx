import { Seo } from '@/components/Seo'
import { skillsSchema } from '@/lib/structuredData'
import { PageHero } from '@/components/ui/PageHero'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Skills() {
  return (
    <>
      <Seo
        title="Skills & Stack"
        description="Full stack and AI skills — React, Next.js, React Native, Python, FastAPI, Node, multi-agent AI, LangChain, RAG, databases, cloud, DevOps and security."
        path="/skills"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Skills', path: '/skills' },
        ]}
        schema={skillsSchema()}
      />
      <PageHero
        label="Skills & Stack"
        lines={['The full toolkit,', 'from idea to scale.']}
        intro="Frontend, backend, mobile, AI & automation, databases, cloud/DevOps and security — a modern stack covering the entire product lifecycle."
      />
      <SkillsSection />
      <ContactSection />
    </>
  )
}
