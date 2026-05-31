import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="6–7 years of experience — Founder of AutoStacks, Buy2Rent.eu, Atlas Technology and 3.5 years freelancing on Fiverr for international clients."
        path="/experience"
      />
      <PageHero
        label="Experience — 6+ Years"
        lines={['A career building', 'AI and software.']}
        intro="From enterprise platforms and mobile apps to AI automation and multi-agent systems — across companies, ventures and clients worldwide."
      />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
