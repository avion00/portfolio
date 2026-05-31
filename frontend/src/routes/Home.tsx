import { Seo } from '@/components/Seo'
import { servicesSchema, faqSchema } from '@/lib/structuredData'
import { Hero } from '@/components/hero/Hero'
import { FeaturedWorks } from '@/components/works/FeaturedWorks'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { CompanySection } from '@/components/sections/CompanySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Seo
        title="AI & Full Stack Developer"
        description="Abhishek Kumar Chaudhary — Full Stack Developer & AI Automation Engineer. Multi-agent AI systems, ERP/CRM, SaaS, mobile apps, FastAPI/Python and automation infrastructure. Founder of AutoStacks."
        path="/"
        schema={[servicesSchema(), faqSchema()]}
      />
      <Hero />
      <FeaturedWorks />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ServicesSection />
      <CompanySection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}
