import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { CompanySection } from '@/components/sections/CompanySection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Company() {
  return (
    <>
      <Seo
        title="AutoStacks"
        description="AutoStacks — a futuristic AI automation and software development company building enterprise AI systems, automation infrastructure, ERP/CRM, SaaS, mobile apps and cloud architectures."
        path="/company"
      />
      <PageHero
        label="My Company"
        lines={['AutoStacks —', 'AI-native software.']}
        intro="A futuristic AI automation and software development company building enterprise-grade AI systems, automation infrastructures and intelligent business ecosystems."
      />
      <CompanySection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}
