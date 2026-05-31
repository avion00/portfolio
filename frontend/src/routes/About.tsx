import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Abhishek Kumar Chaudhary — Full Stack Developer & AI Automation Engineer with 6–7 years of experience and Founder of AutoStacks."
        path="/about"
      />
      <PageHero
        label="About Me"
        lines={['Engineer, founder,', 'AI automation expert.']}
        intro="I build enterprise applications, AI systems, ERP/CRM platforms, SaaS products, mobile apps and automation infrastructures for startups, enterprises and international clients."
      />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
